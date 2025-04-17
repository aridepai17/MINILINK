import connectDB from "../../lib/connectDB";
import userModel from "../../model/userModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    try {
      await connectDB();

      const user = await userModel.findOne({ "links.shortUrl": slug });

      if (!user) {
        return res.status(404).json({ error: "Short link not found" });
      }

      const link = user.links.find((l) => l.shortUrl === slug);

      if (!link) {
        return res.status(404).json({ error: "Link not found" });
      }

      return res.status(200).json({ originalUrl: link.url });
    } catch (err) {
      console.error("Redirect error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
