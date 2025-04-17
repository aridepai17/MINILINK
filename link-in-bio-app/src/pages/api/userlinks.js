import connectDB from "@/lib/connectDB";
import userModel from "@/model/userModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      await connectDB();
      const user = await userModel.findOne({ email });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json({ links: user.links || [] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
