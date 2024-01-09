"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalAppContextProvider } from "@/context/globalContext";
const inter = Inter({ subsets: ["latin"] });

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "344849f39752223d62233f4b0d0602a4";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  title: "Anony Mes",
  name: "Anony Mes",
  description:
    "Anony Mes your web3 anonymous comment space. Make fun and tell your friend what you think about them.",
  url: "ps://anonymes.vercel.app",
  icons: ["ps://anonymes.vercel.app"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalAppContextProvider>
        <body className={inter.className}>{children}</body>
      </GlobalAppContextProvider>
    </html>
  );
}
