import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "Not Defined",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY
        ? "Exists"
        : "Not Defined",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        ? "Exists"
        : "Not Defined",
    });
  } catch (error) {
    res.status(500).json({ error: "Server crashed", details: error });
  }
}
