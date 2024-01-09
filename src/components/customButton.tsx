import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import React from "react";

type propsType = {
  children: React.ReactNode;
  onClick?: () => void;
};

function CustomButton(props: propsType) {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  return (
    <button className="" onClick={isConnected ? props.onClick : () => open()}>
      {props.children}
    </button>
  );
}

export default CustomButton;
