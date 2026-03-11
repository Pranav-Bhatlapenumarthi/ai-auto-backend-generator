import { useState } from "react";
import { generateBackend } from "../api";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      await generateBackend({ prompt }); 
    } catch (err) {
      alert("Generation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 90 }}>
      <h2>AI Backend Generator</h2>
      <textarea
        rows="10"
        cols="100"
        placeholder="Describe the backend you want (e.g., 'An express backend for a blog with posts and comments, using MongoDB')..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br /><br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating (This may take a minute)..." : "Generate Backend"}
      </button>
    </div>
  );
}