import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
    if (req.method === "POST") {    
        try {
            const { username, password } = req.body;
            await connectDB();

            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            if (user.password !== password) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
        
        res.status(200).json({ message: "Login successful", data: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
