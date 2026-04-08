import { useState } from "react";
import { generateBackend } from "../api";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setError("");
    setSuccess(false);

    if (!prompt.trim()) {
      setError("Please enter a backend description.");
      return;
    }
    try {
      setLoading(true);
      await generateBackend({ prompt }); 
      setSuccess(true); // Trigger success state when done
      setPrompt(""); // Clear the prompt after success
    } catch (err) {
      setError("Generation failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container glass-panel">

      <label className="input-label">
        Describe the backend you want to generate
      </label>

      <textarea
        className="prompt-input"
        rows="6"
        placeholder="Example: Create an Express backend for a blog with Post and Comment models."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />

      <button
        className={`generate-btn ${loading ? "loading" : ""}`}
        onClick={handleGenerate}
        disabled={loading}
      >
         {loading ? (
          <>
            <span className="spinner"></span> Working on it...
          </>
        ) : (
          "Generate Backend"
        )}
      </button>

      {/* Status Messages */}
      {error && <div className="status-box error-box">{error}</div>}
      {success && (
        <div className="status-box success-box">
            Success! Your backend code has been generated and downloaded.
        </div>
      )}

    </div>
  );
}