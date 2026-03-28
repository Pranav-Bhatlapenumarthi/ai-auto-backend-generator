import { useState } from "react";
import { generateBackend } from "../api";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");

    if (!prompt.trim()) {
      setError("Please enter a backend description.");
      return;
    }
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
    <div className="generator-container">

      <label className="input-label">
        Describe the backend you want to generate
      </label>

      <textarea
        className="prompt-input"
        rows="6"
        placeholder="Example: Create an Express backend for a blog with Post and Comment models."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating Backend..." : "Generate Backend"}
      </button>

      {error && <div className="error-box">{error}</div>}

    </div>
  );
}