import GeneratorForm from "./components/GeneratorForm";
import LiveBackground from "./components/LiveBackground";

export default function App() {
  return (
    <>
      <LiveBackground />
      <div className="app-container">
        <header className="header glass-panel">
          <h2>AI Auto Backend</h2>
          <p>Generate production-ready scaffolding instantly.</p>
        </header>

        <GeneratorForm />
        <footer className="footer">
          
        </footer>
      </div>
    </>
  );
}