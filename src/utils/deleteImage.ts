export async function deleteImage(url: string) {
  const parts = url.split("/");
  const fileNameWithExtension = parts[parts.length - 1];
  const public_id = fileNameWithExtension.split(".")[0];

  if (!public_id) {
    throw new Error("Não foi possível extrair o public_id da URL");
  }

  const response = await fetch("/api/deleteImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Erro ao deletar");
}
