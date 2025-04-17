import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing and comparison
import jwt from 'jsonwebtoken'; // Import JWT for token generation

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;
            
            // Validate input
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            await connectDB();

            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            // Create a JWT token
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET, // Store your secret in a .env file
                { expiresIn: "1h" } // Token expiry (1 hour in this case)
            );

            // Return a success response with the token
            return res.status(200).json({ 
                message: "Login successful", 
                token,
                user: { 
                    username: user.username, 
                    email: user.email 
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
