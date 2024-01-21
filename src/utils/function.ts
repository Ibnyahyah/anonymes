import { ErrorType } from "./types/error";
declare let window: any;
async function switchToSepolia() {
  if (window!.ethereum) {
    try {
      // Request user to switch to Sepolia
      await window.ethereum!.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Chain ID for Sepolia in hexadecimal
      });
    } catch (switchError) {
      if ((switchError as ErrorType).code === 4902) {
        try {
          // If Sepolia is not added to user's MetaMask, add it
          await window!.ethereum?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Sepolia network to MetaMask", addError);
        }
      } else {
        console.error("Failed to switch to Sepolia network", switchError);
      }
    }
  }
}

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
      switchToSepolia();
    }
  } catch (e) {
    console.log(e);
  }
};
