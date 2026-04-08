export async function generateBackend(prompt) {

  const response = await fetch("http://localhost:3000/api/generate", {
    // "http://100.48.212.89:3000/api/generate" || "http://3.237.71.17:3000/api/generate" || 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({prompt})
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.Error||"Generation failed");
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
