// pages/api/deletelink.js

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

    // Find the user and attempt to delete the link
    const result = await User.findOneAndUpdate(
      { email, "links._id": linkId }, // Ensures the link with the specific ID exists
      { $pull: { links: { _id: linkId } } }, // Pull the link from the array
      { new: true } // Return the updated user document
    );

    if (!result) {
      return res.status(404).json({ error: "User not found or link not deleted" });
    }

    // Optionally, return the updated links or user data
    res.status(200).json({ 
      message: "Link deleted successfully", 
      updatedLinks: result.links 
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
