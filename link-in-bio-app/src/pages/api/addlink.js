import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { userId, title, link, status } = req.body;
            
            // Basic validation
            if (!title || !link || !status) {
                return res.status(400).json({ error: "All fields (title, link, status) are required" });
            }

            // Ensure the link is a valid URL
            try {
                new URL(link);  // Will throw an error if link is not a valid URL
            } catch (e) {
                return res.status(400).json({ error: "Invalid URL" });
            }

            await connectDB();

            const user = await userModel.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const newLink = { title, link, status };
            user.links.push(newLink);
            await user.save();

            res.status(200).json({ message: "Link added successfully", data: newLink });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
