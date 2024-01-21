import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Image from "next/image";
import React from "react";

import Loader from "@/assets/gifs/loading.gif";

type propsType = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  isOutlined?: boolean;
  title?: string;
  moreStyle?: string;
};

function CustomButton(props: propsType) {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  return (
    <button
      className={`p-4 py-2 ${
        props.moreStyle ?? "bg-white-100"
      } rounded-md text-[12px] md:text-[100%] ${
        props.isOutlined ? "border border-black" : ""
      }`}
      disabled={props.loading}
      onClick={
        props.loading ? () => {} : isConnected ? props.onClick : () => open()
      }
      title={props.title}
    >
      {props.loading ? (
        <Image
          src={Loader}
          alt=""
          width={100}
          height={100}
          className="w-[30px] h-[30px] object-contain"
        />
      ) : (
        props.children
      )}
    </button>
  );
}

export default CustomButton;
