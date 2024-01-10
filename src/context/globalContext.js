import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import { createContext, useCallback, useEffect, useState } from "react";

export const GlobalAppContext = createContext();

export const GlobalAppContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();

  const getMessages = useCallback(async () => {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const AnnoyContract = new Contract(ANONYAddress, ANONY_MES_Abi, signer);
      const response = await AnnoyContract.getMessages();
      console.log(response);
      const responseArr = [];
      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        console.log(element.comments);
        responseArr.push(element);
      }
      setMessages(responseArr);
    } catch (e) {
      alert(e);
    }
  }, [isConnected, walletProvider]);

  const getMessage = useCallback(
    async (id, owner) => {
      try {
        if (!isConnected) {
          open();
          return;
        }

        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const AnnoyContract = new Contract(ANONYAddress, ANONY_MES_Abi, signer);
        const response = await AnnoyContract.getMessage(id, owner);
        console.log(response);
        return response;
      } catch (e) {
        alert(e);
      }
    },
    [isConnected, walletProvider, open]
  );

  useEffect(() => {
    if (isConnected) {
      getMessages();
    }
  }, [getMessages, isConnected]);

  const data = { messages, getMessages, getMessage };
  return (
    <GlobalAppContext.Provider value={data}>
      {children}
    </GlobalAppContext.Provider>
  );
};
