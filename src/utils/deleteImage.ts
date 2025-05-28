export async function deleteImage(url: string) {
  const regex = /upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+(?:\?.*)?$/;
  const match = url.match(regex);
  const publicId = match ? match[1] : null;

  if (!publicId) {
    throw new Error("Não foi possível extrair o publicId da URL");
  }

  const response = await fetch("/api/deleteImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Erro ao deletar");

  console.log(data.message);
}
