"use client";

import CustomButton from "@/components/customButton";
import Navbar from "@/components/navbar";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { isConnected } = useWeb3ModalAccount();

  const navigateToDashboard = useCallback(() => {
    if (isConnected) {
      router.push("/create");
    }
  }, [router, isConnected]);

  useEffect(() => {
    // navigateToDashboard();
  }, [navigateToDashboard]);
  return (
    <main className="min-h-screen container mx-auto px-4 md:px-24">
      <Navbar />
      <div className="py-10 flex items-center justify-center md:h-[80vh]">
        <div className="text-center flex flex-col justify-center">
          <h1 className="md:text-3xl md:font-regular">Welcome to Anonymous</h1>
          <p className="my-6 text-3xl md:text-7xl md:font-medium px-10">
            Your web3 base Anonymous message application. It is secure,
            transparent and fast.
          </p>
          <p className="mb-10">
            It is also a very simple software for everybody to make use of.
          </p>
          <div className="flex gap-x-10 items-center justify-center">
            <CustomButton onClick={navigateToDashboard}>
              Get Started
            </CustomButton>
            <CustomButton>Learn more</CustomButton>
          </div>
        </div>
      </div>
    </main>
  );
}
