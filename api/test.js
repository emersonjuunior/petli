
export default function handler(res) {
  console.log("Função rodando normalmente!");
  res.status(200).json({ message: "Função rodando normalmente!" });
}
