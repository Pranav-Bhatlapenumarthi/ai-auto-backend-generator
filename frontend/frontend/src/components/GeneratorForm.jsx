import { useState } from "react";
import { generateBackend } from "../api";

export default function GeneratorForm() {

  const [jsonInput, setJsonInput] = useState("");

  const handleGenerate = async () => {

    try {

      const spec = JSON.parse(jsonInput);

      await generateBackend(spec);

    } catch (err) {
      alert("Invalid JSON or generation failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 90 }}>

      <h2>Backend Generator</h2>

      <textarea
        rows="25"
        cols="100"
        placeholder="Paste backend spec JSON here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <br /><br />

      <button onClick={handleGenerate}>
        Generate Backend
      </button>

    </div>
  );
}
