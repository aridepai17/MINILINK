import UserMOdel from "../../model/userModel";
import connectDB from "../../lib/connectDB";
import { resolve } from "styled-jsx/css";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;
            await connectDB();

            const existingUser = await userModel.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }
            
            const newUser = new UserModel({ username, password });
            await newUser.save();

            res.status(201).json({ message: "User created successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}