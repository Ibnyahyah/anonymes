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
    router.push("/create");
  }, [router]);

  useEffect(() => {
    if (isConnected) {
      navigateToDashboard();
    }
  }, [navigateToDashboard, isConnected]);
  return (
    <main className="min-h-screen container mx-auto px-24">
      <Navbar />
      <div className="grid grid-cols-2 gap-10 min-h-[80dvh] items-center py-10">
        <div className="">
          <h1 className="md:text-5xl md:font-bold">Welcome to ANONYm</h1>
          <p className="my-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            adipisci modi, doloremque perferendis praesentium dolore facere
            impedit eius repellendus possimus.
          </p>
          <CustomButton onClick={navigateToDashboard}>
            Create Your AnonyM
          </CustomButton>
        </div>
        <div className="md:h-1/2 bg-white rounded-md w-full"></div>
      </div>
    </main>
  );
}
