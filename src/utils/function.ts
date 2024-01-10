import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export const checkIfChainIdIsCorrectThenContinue = ({
  cFn,
  isConnected,
  chainId,
}: {
  cFn: () => any;
  isConnected: boolean;
  chainId: number | undefined;
}) => {
  try {
    if (!isConnected) throw Error("You are not connected");
    if (chainId === 11155111) {
      setTimeout(cFn, 100);
    } else {
      throw Error("You are required to use Sepolia. Kindly switch to Sepolia?");
    }
  } catch (e) {
    alert(e);
  }
};
