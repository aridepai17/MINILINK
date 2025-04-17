import connectDB from "@/lib/connectDB";
import User from "../../model/userModel";



export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, linkId } = req.body;

  if (!email || !linkId) {
    return res.status(400).json({ error: "Missing email or linkId" });
  }

  try {
    await connectDB();

    const result = await User.findOneAndUpdate(
      { email },
      { $pull: { links: { _id: linkId } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "User not found or link not deleted" });
    }

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
