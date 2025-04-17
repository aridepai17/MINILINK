import UserModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;

            // Validate input (Check if username and password are provided)
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            await connectDB();

            // Check if the username already exists
            const existingUser = await UserModel.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

            // Create a new user
            const newUser = new UserModel({ username, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
