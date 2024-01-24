import { AMEsAddress, ANONYAddress, PROFILEAddress } from "@/constants";
import { AMEs_ABI } from "@/constants/amesAbi";
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
  const [userMessages, setUserMessages] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [user, setUser] = React.useState();
  const [message, setMessage] = useState();
  const [comments, setComments] = useState([]);
  const [balance, setBalance] = useState("0");

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

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
          const response = await AnnoyContract.getPublicMessages();
          const responseArr = [];
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            responseArr.push(element);
          }
          setMessages(
            responseArr
              .filter((el) => el.isPublic)
              .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
          );
        },
        chainId,
        isConnected,
      }),
    [isConnected, chainId, walletProvider]
  );

  const getUserMessages = useCallback(
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
          const responseArr = [];
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            // console.log(element.id);
            responseArr.push(element);
          }
          setUserMessages(
            responseArr.sort(
              (a, b) => Number(b.timestamp) - Number(a.timestamp)
            )
          );
        },
        chainId,
        isConnected,
      }),
    [isConnected, chainId, walletProvider]
  );

  const getMessage = (id) =>
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        setMessage(null);
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
  const getComments = (id) =>
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        setComments([]);
        try {
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          const response = await AnnoyContract.getComments(id);
          // console.log(response);
          const responseArr = [];
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            console.log(response[i]);
            console.log(response[i].msgID);
            console.log(response[i].content);
            responseArr.push(element);
          }
          setComments(
            responseArr.sort(
              (a, b) => Number(b.timestamp) - Number(a.timestamp)
            )
          );
          console.log(response);
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
  const getRewardBalance = React.useCallback(
    () =>
      checkIfChainIdIsCorrectThenContinue({
        cFn: async () => {
          try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const AMEsContract = new Contract(AMEsAddress, AMEs_ABI, signer);
            const response = await AMEsContract.balanceOf(address);
            setBalance(BigInt(response).toString());
          } catch (e) {
            console.log(e.message);
            throw e.message;
          }
        },
        chainId,
        isConnected,
      }),
    [chainId, walletProvider, isConnected, address]
  );

  useEffect(() => {
    if (isConnected) {
      getMessages();
      getUserMessages();
    }
  }, [getMessages, isConnected, getUserMessages]);

  function toggleSideBar() {
    setSideBarOpen((prev) => !prev);
  }

  const data = {
    messages,
    userMessages,
    getMessages,
    getUserMessages,
    toggleSideBar,
    sideBarOpen,
    setSideBarOpen,
    getMessage,
    getComments,
    comments,
    getProfile,
    getRewardBalance,
    user,
    message,
    balance,
  };
  return (
    <GlobalAppContext.Provider value={data}>
      {children}
    </GlobalAppContext.Provider>
  );
};
