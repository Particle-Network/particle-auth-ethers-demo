import React from "react";

// Particle imports
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit";
import { AuthType } from "@particle-network/auth-core";
import { baseSepolia, sepolia } from "@particle-network/authkit/chains";

interface ParticleAuthkitProps {
  children: React.ReactNode;
}

export const ParticleAuthkit: React.FC<ParticleAuthkitProps> = ({
  children,
}) => {
  return (
    <AuthCoreContextProvider
      options={{
        // All env variables must be defined at runtime
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
        // Locks the chain selector to Base Sepolia and Ethereum Sepolia
        chains: [baseSepolia, sepolia],
        themeType: "dark",
        // You can prompt the user to set up extra security measures upon login or other interactions
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },
        wallet: {
          // Set to false to remove the embedded wallet modal
          visible: true,
          customStyle: {
            supportUIModeSwitch: true,
            supportLanguageSwitch: false,
          },
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};
