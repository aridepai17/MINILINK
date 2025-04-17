// pages/api/shorten.js

import connectDB from "@/lib/connectDB";
import userModel from "@/model/userModel";
import crypto from "crypto";

const generateShortUrl = () => {
  return crypto.randomBytes(6).toString("hex");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { url, title, email } = req.body;

  if (!url || !title || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    await connectDB();

    const shortUrl = generateShortUrl();
    const linkData = { title, link: url, shortUrl };

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ email, links: [linkData] });
    } else {
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
