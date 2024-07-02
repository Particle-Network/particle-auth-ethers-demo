import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Particle imports
import { AuthType } from "@particle-network/auth-core";
import { BaseSepolia, EthereumSepolia } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";

console.log(AuthType);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Particle Next Starter",
  description: "Demo using Particle Network's Auth Core SDK and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCoreContextProvider
          options={{
            projectId: process.env.REACT_APP_PROJECT_ID || "",
            clientKey: process.env.REACT_APP_CLIENT_KEY || "",
            appId: process.env.REACT_APP_APP_ID || "",
            //authTypes: [AuthType.google, AuthType.twitter, AuthType.github],
            themeType: "dark",
            wallet: {
              // Set to false to remove the embedded wallet modal
              visible: true,
              customStyle: {
                // Locks the chain selector to Base Sepolia
                supportChains: [BaseSepolia],
              },
            },
          }}
        >
          {children}
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}
