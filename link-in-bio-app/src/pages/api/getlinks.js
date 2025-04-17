import connectDB from "../../lib/connectDB";
import userModel from "../../model/userModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Get the email from query parameters
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
      }

      console.log("Fetching links for email:", email); // Debug log

      // Connect to the database
      await connectDB();

      // Find the user by email
      const user = await userModel.findOne({ email });

      if (!user) {
        console.log("User not found for email:", email); // Debug log
        return res.status(404).json({ error: "User not found" });
      }

      // Ensure user.links is an array and map the data accordingly
      if (!Array.isArray(user.links)) {
        console.log("No links found for user:", email); // Debug log
        return res.status(404).json({ error: "No links found for this user" });
      }

      const links = user.links?.map((link) => ({
        _id: link._id,
        title: link.title,
        originalUrl: link.url,
        shortUrl: link.shortUrl, // Ensure this is populated
      })) || [];
      

      console.log("Links retrieved:", links); // Debug log

      // Return the links
      res.status(200).json({ links });
    } catch (error) {
      console.error("Error fetching links:", error); // Detailed error log
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
