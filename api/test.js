export default function handler(req, res) {
  console.log("Função rodando normalmente!");
  res.status(200).json({ message: "Função rodando normalmente!" });
}