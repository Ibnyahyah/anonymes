"use client";

import CustomButton from "@/components/customButton";
import CustomLink from "@/components/customLink";
import TextFields from "@/components/inputFields";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { GlobalAppContext } from "@/context/globalContext";
import LayoutTemplate from "@/layout";
import { checkIfChainIdIsCorrectThenContinue } from "@/utils/function";
import { ErrorType } from "@/utils/types/error";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export type msgType = {
  owner: string;
  comments: string[];
  title: string;
  id: number;
};

function CreateAnonyM() {
  const {
    messages,
    getMessages,
    getProfile,
  }: { messages: msgType[]; getMessages: () => void; getProfile: () => any } =
    React.useContext(GlobalAppContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [openCreateProfile, setOpenCreateProfile] = React.useState(false);

  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function createMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        try {
          const result = getProfile();
          setLoading(true);
          const ethersProvider = new BrowserProvider(walletProvider!);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          if (message.trim() == "") throw Error("Message is required");
          const response = await AnnoyContract.createMessage(message, isPublic);
          console.log(response);
          getMessages();
          setMessage("");
          alert("Message created");
        } catch (e) {
          console.log(e);
          alert((e as ErrorType).message);
        } finally {
          setLoading(false);
        }
      },
      chainId,
      isConnected,
    });
  }

  return (
    <LayoutTemplate
      title="Create Your Anonymes"
      openCreateProfile={openCreateProfile}
    >
      <form
        className="w-full border border-white-100 rounded-md p-2"
        onSubmit={createMessage}
      >
        <select
          title="Message Type"
          className="bg-[transparent] w-[120px] outline-0 border border-white-100 mb-2 rounded-sm"
          onChange={(e) => {
            setIsPublic(e.target.value === "Public");
          }}
        >
          {["Private", "Public"].map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
        <TextFields
          placeholder="What on your ...?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="flex justify-end mt-4">
          <CustomButton loading={loading}>Create Now</CustomButton>
        </div>
      </form>
      <div className="my-10">
        <h1>Messages</h1>
        {messages.length <= 0 ? (
          <p className="text-center my-10">No messages</p>
        ) : (
          <div className="grid gap-5 mt-5">
            {messages
              .reverse()
              .slice(0, 6)
              .map((e, i) => (
                <div
                  key={i}
                  className="border border-white-100 rounded-[5px] p-2 text-white"
                >
                  <div className="flex gap-3">
                    <div className="bg-white-100 w-[60px] h-[50px] md:h-[60px] rounded-md flex items-center justify-center">
                      {address?.slice(0, 4)}
                    </div>
                    <div className="w-full">
                      <p className="text-[14px]">{address?.slice(0, 6)}...</p>
                      <div className="mt-3 w-full">
                        <p>{e.title}</p>
                        <div className="mt-2 flex gap-x-4">
                          <CustomLink route={`/comment/${e.id}`}>
                            <p className="text-white-100">
                              Comments:{e.comments.length}
                            </p>
                          </CustomLink>
                          <p className="text-white-100">Share</p>
                        </div>
                      </div>
                      {e.comments.length > 0 && (
                        <div className="mt-3 bg-white-100 rounded-md p-2 md:ml-10">
                          <p className="border-b mb-4">Lastest comment</p>
                          <div>{e.comments[0]}</div>
                          <CustomLink route={`/comment/${e.id}`}>
                            <p className="text-white-100">view all</p>
                          </CustomLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </LayoutTemplate>
  );
}

export default CreateAnonyM;
