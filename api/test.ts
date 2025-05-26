import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("Função rodando normalmente!");
  res.status(200).json({ message: "Função rodando normalmente!" });
}
