"use client";
import React, { useState, useEffect } from "react";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  // Hooks to manage logins, data display, and transactions
  const { connect, disconnect, connectionStatus } = useConnect();
  const { address, provider, chainInfo } = useEthereum();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const ethersProvider = new ethers.BrowserProvider(provider, "any");

  // Fetch the balance when userInfo or chainInfo changes
  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, chainInfo]);

  // Fetch the user's balance in Ether
  const fetchBalance = async () => {
    try {
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      const balanceResponse = await ethersProvider.getBalance(address);
      const balanceInEther = ethers.formatEther(balanceResponse);

      // Format the balance to 6 decimal places; more accurate than using .toFixed()
      // This could ne moved to a utils file
      const [integerPart, decimalPart] = balanceInEther.split(".");
      const truncatedDecimalPart = decimalPart
        ? decimalPart.slice(0, 6)
        : "000000";
      const fixedBalance = `${integerPart}.${truncatedDecimalPart}`;

      console.log(fixedBalance);
      setBalance(fixedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    if (!userInfo) {
      await connect({});
    }
  };

  // Handle user disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // Execute an Ethereum transaction
  // Simple transfer in this example
  const executeTxEvm = async () => {
    const signer = await ethersProvider.getSigner();
    const tx = {
      to: recipientAddress,
      value: ethers.parseEther("0.01"),
      data: "0x",
    };

    try {
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        alert(`Transaction Successful. Transaction Hash: ${txReceipt.hash}`);
      } else {
        console.error("Transaction receipt is null");
      }
    } catch (error) {
      console.error("Error executing EVM transaction:", error);
    }
  };

  // The UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-black text-white">
      <Head>
        <title>Particle Auth Core App</title>
        <meta name="description" content="Particle Auth Code demo in Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl mt-4 font-bold mb-12 text-center flex items-center justify-center">
        Welcome to
        <a
          href="https://particle.network"
          className="text-purple-400 hover:text-purple-300 transition duration-300 ml-2"
        >
          <Image src="/dark.png" alt="Particle Logo" width={240} height={24} />
        </a>
      </h1>

      <h2 className="text-lg font-bold  mb-6">
        Particle Auth demo Next.js. Connect with social logins and send a
        transaction.
      </h2>
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        {!userInfo ? (
          <div className="login-section">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              onClick={handleLogin}
            >
              Sign in with Particle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="border border-purple-500 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-white">
                Account: {userInfo.name}
              </h2>
              <h2 className="text-lg font-semibold mb-2 text-white">
                Status: {connectionStatus}
              </h2>

              <h2 className="text-md font-semibold mb-2 text-white">
                Address: <code>{address}</code>
              </h2>
              <h3 className="text-lg mb-2 text-gray-400">
                Chain: {chainInfo.fullname}
              </h3>
              <h3 className="text-lg font-semibold text-purple-400">
                Balance: {balance} {chainInfo.nativeCurrency.symbol}
              </h3>
            </div>
            <div className="border border-purple-500 p-6 rounded-lg">
              <h2 className="text-xl font-bold">Send 0.01 ETH</h2>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={executeTxEvm}
                disabled={!recipientAddress}
              >
                Send 0.01 ETH
              </button>
              <div>
                <button
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mt-8 mb-6 text-center">
          <a
            href="https://github.com/soos3d/particle-next-starter"
            target="blank"
            className="text-white hover:text-purple-300 transition duration-300 flex items-center"
          >
            <img
              src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
              alt="GitHub Logo"
              className="w-6 h-6 mr-2"
            />
            Check the repository
          </a>
        </h2>
        <p className="text-xl mb-12 text-center">
          Get started by editing{" "}
          <code className="bg-gray-800 rounded p-1 text-purple-300">
            src/app/page.tsx
          </code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <a
            href="https://docs.particle.network"
            className="border border-purple-500 p-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">
              Documentation &rarr;
            </h2>
            <p className="text-gray-300">
              Find in-depth information about AuthCore features and API.
            </p>
          </a>
          <a
            href="https://dashboard.particle.network"
            className="border border-purple-500 p-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">
              Dashboard &rarr;
            </h2>
            <p className="text-gray-300">
              Manage your projects and team, View analytics data, Custom
              configuration.
            </p>
          </a>
          <a
            href="https://github.com/Particle-Network/particle-web-auth-core"
            className="border border-purple-500 p-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">
              Examples &rarr;
            </h2>
            <p className="text-gray-300">
              Discover and deploy boilerplate example AuthCore projects.
            </p>
          </a>
          <a
            href="https://particle.network"
            className="border border-purple-500 p-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">
              Particle Network &rarr;
            </h2>
            <p className="text-gray-300">
              The Intent-Centric Modular Access Layer of Web3.
            </p>
          </a>
        </div>
        <footer className="w-full flex justify-center items-center py-8">
          <Image src="/dark.png" alt="Particle Logo" width={240} height={24} />
        </footer>
      </main>
    </div>
  );
};

export default Home;
