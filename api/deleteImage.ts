import { VercelRequest, VercelResponse } from "@vercel/node";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "Public ID não informado" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result === "ok") {
      return res.json({ message: "Imagem deletada com sucesso" });
    } else {
      return res
        .status(400)
        .json({ error: "Erro ao deletar a imagem", result });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno", details: error });
  }
}
