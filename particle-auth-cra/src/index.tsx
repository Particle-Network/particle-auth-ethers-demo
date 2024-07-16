import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Particle imports
import { AuthType } from "@particle-network/auth-core";
import { BaseSepolia, EthereumSepolia } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        // All env variable must be defined at runtime
        projectId: process.env.REACT_APP_PROJECT_ID!,
        clientKey: process.env.REACT_APP_CLIENT_KEY!,
        appId: process.env.REACT_APP_APP_ID!,

        // This is how you limit the options available.
        // Remove the authTypes array to display all options available
        authTypes: [
          AuthType.email,
          AuthType.google,
          AuthType.twitter,
          AuthType.github,
          AuthType.discord,
        ],
        themeType: "dark",
        wallet: {
          // Set to false to remove the embedded wallet modal
          visible: true,
          customStyle: {
            // Locks the chain selector to Base Sepolia and Ethereum Sepolia
            supportChains: [BaseSepolia, EthereumSepolia],
          },
        },
      }}
    >
      <App />
    </AuthCoreContextProvider>
  </React.StrictMode>
);
