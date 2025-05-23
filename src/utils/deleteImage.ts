export async function deleteImage(public_id: string) {
  const response = await fetch("/api/deleteImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Erro ao deletar");
  return data.message;
}
