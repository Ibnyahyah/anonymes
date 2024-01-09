import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import {
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

  useEffect(() => {
    if (isConnected) {
      getMessages();
    }
  }, [getMessages, isConnected]);

  const data = { messages, getMessages };
  return (
    <GlobalAppContext.Provider value={data}>
      {children}
    </GlobalAppContext.Provider>
  );
};
