import GeneratorForm from "./components/GeneratorForm";

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Auto Backend Generator</h1>
        <p>Generate production-ready backend scaffolding instantly.</p>
      </header>

      <GeneratorForm />

      <footer className="footer">
        <p>Powered by Node.js + Express + AI Backend Generator</p>
      </footer>
    </div>
  );
}