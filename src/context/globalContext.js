import { ANONYAddress, PROFILEAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { PROFILE_ABI } from "@/constants/profileAbi";
import { checkIfChainIdIsCorrectThenContinue } from "@/utils/function";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Contract, ethers } from "ethers";
import { BrowserProvider } from "ethers";
import React, { createContext, useCallback, useEffect, useState } from "react";

export const GlobalAppContext = createContext();

export const GlobalAppContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [user, setUser] = React.useState();
  const [message, setMessage] = useState();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();

  const getMessages = useCallback(
    () =>
      checkIfChainIdIsCorrectThenContinue({
        cFn: async () => {
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          const response = await AnnoyContract.getMessages();
          console.log(response);
          const responseArr = [];
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            console.log(element.comments);
            responseArr.push(element);
          }
          setMessages(responseArr);
        },
        chainId,
        isConnected,
      }),
    [isConnected, chainId, walletProvider]
  );
  const getMessage = (id) =>
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        try {
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          const response = await AnnoyContract.getMessage(id);
          setMessage(response);
        } catch (err) {
          throw err;
        }
      },
      chainId,
      isConnected,
    });

  const getProfile = React.useCallback(
    () =>
      checkIfChainIdIsCorrectThenContinue({
        cFn: async () => {
          try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const profileContract = new Contract(
              PROFILEAddress,
              PROFILE_ABI,
              signer
            );

            const response = await profileContract.getUserProfile(address);

            setUser(response);
          } catch (e) {
            console.log(e.message);
            throw e.message;
          }
        },
        chainId,
        isConnected,
      }),
    [chainId, address, walletProvider, isConnected]
  );

  useEffect(() => {
    if (isConnected) {
      getMessages();
    }
  }, [getMessages, isConnected]);

  function toggleSideBar() {
    setSideBarOpen((prev) => !prev);
  }

  const data = {
    messages,
    getMessages,
    toggleSideBar,
    sideBarOpen,
    getMessage,
    getProfile,
    user,
    message,
  };
  return (
    <GlobalAppContext.Provider value={data}>
      {children}
    </GlobalAppContext.Provider>
  );
};
