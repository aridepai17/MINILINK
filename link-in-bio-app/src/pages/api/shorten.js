// pages/api/shorten.js

import connectDB from "@/lib/connectDB";
import userModel from "@/model/userModel";
import crypto from "crypto";

const generateShortUrl = async () => {
  let shortUrl = crypto.randomBytes(6).toString("hex");

  // Check if the generated short URL already exists in the database
  const existingLink = await userModel.findOne({ "links.shortUrl": shortUrl });

  // If it exists, regenerate
  if (existingLink) {
    return generateShortUrl(); // Recursive call to generate a unique short URL
  }

  return shortUrl;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, title, email } = req.body;

  if (!url || !title || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await connectDB();

    // Generate a unique short URL
    const shortUrl = await generateShortUrl();

    const linkData = { title, link: url, shortUrl };

    let user = await userModel.findOne({ email });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = await userModel.create({ email, links: [linkData] });
    } else {
      // Check if the user already has this URL
      const existingLink = user.links.find((link) => link.link === url);

      if (existingLink) {
        return res.status(400).json({ error: "URL already shortened" });
      }

      // Add the new link to the user's links
      user.links.push(linkData);
      await user.save();
    }

    const lastLink = user.links[user.links.length - 1];

    res.status(200).json({
      message: "URL shortened successfully",
      newLink: {
        _id: lastLink._id,
        title,
        originalUrl: url,
        shortUrl: shortUrl,
      },
    });
  } catch (err) {
    console.error("Shorten Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
