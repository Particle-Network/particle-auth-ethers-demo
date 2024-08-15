import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Particle imports
import { ParticleAuthkit } from "./components/Authkit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParticleAuthkit>
      <App />
    </ParticleAuthkit>
  </React.StrictMode>
);
