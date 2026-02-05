export async function generateBackend(spec) {

  const response = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spec)
  });

  if (!response.ok) {
    throw new Error("Generation failed");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "generated-backend.zip";
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
}
