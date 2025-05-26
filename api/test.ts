import { VercelResponse } from "@vercel/node";

export default function handler(res: VercelResponse) {
  console.log("Função rodando normalmente!");
  res.status(200).json({ message: "Função rodando normalmente!" });
}
