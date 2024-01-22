"use client";

import React from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import CustomButton from "./customButton";
import Link from "next/link";
import { GlobalAppContext } from "@/context/globalContext";
import { userType } from "@/utils/types/user";

type propsTypes = {
  showLogo?: boolean | true;
};

function Navbar({ showLogo = false }: propsTypes) {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const {
    getProfile,
    getRewardBalance,
    toggleSideBar,
    user,
    balance,
  }: {
    getProfile: () => void;
    getRewardBalance: () => void;
    toggleSideBar: () => void;
    user: userType;
    balance: number;
  } = React.useContext(GlobalAppContext);

  React.useEffect(() => {
    getProfile();
    getRewardBalance();
  }, [getProfile, getRewardBalance]);
  return (
    <nav className="flex justify-between bg-black sticky top-0 py-10 items-center">
      {showLogo ? (
        <Link href="/" className="text-2xl font-[800] text-green">
          ANONY<span className="font-[300] text-[16px] text-white">m</span>
        </Link>
      ) : (
        <>
          {isConnected ? (
            <div className="flex gap-x-2" onClick={toggleSideBar}>
              <div className="bg-white-100 w-[60px] h-[60px] rounded-md flex items-center justify-center">
                {address?.slice(0, 4)}
              </div>
              <div>
                <p>Hello {user?.username ?? "there, you have"}</p>
                <p>$AMes: {balance}</p>
              </div>
            </div>
          ) : (
            <div />
          )}
        </>
      )}
      <div className="flex gap-4 items-center">
        {showLogo ? (
          <CustomButton onClick={isConnected ? () => {} : () => open()}>
            {isConnected ? "Connected" : "Connect Wallet"}
          </CustomButton>
        ) : (
          <CustomButton onClick={() => {}} title="Mint $Ames token">
            {isConnected ? "Mint" : "Connect Wallet"}
          </CustomButton>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
