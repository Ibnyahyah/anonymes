"use client";

import CustomButton from "@/components/customButton";
import Navbar from "@/components/navbar";
import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { GlobalAppContext } from "@/context/globalContext";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

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
  }: { messages: msgType[]; getMessages: () => void } =
    React.useContext(GlobalAppContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function createMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!isConnected) throw Error("User disconnected");
      setLoading(true);

      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner();
      // The Contract object
      const AnnoyContract = new Contract(ANONYAddress, ANONY_MES_Abi, signer);
      if (message.trim() == "") throw Error("Message is required");
      const response = await AnnoyContract.createMessage(message);
      console.log(response);
      getMessages();
      setMessage("");
      alert("Message created");
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-24">
      <Navbar />
      <form className="w-full" onSubmit={createMessage}>
        <textarea
          placeholder="What is your ...?"
          className="w-full h-[250px] font-[600] text-4xl rounded-md border-0 outlined-0 resize-none p-5 text-black"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="flex justify-end my-4">
          <CustomButton loading={loading}>Create Now</CustomButton>
        </div>
      </form>
      <div className="my-10">
        <h1>Messages</h1>
        {messages.length <= 0 ? (
          <p className="text-center my-10">No messages</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            {messages
              .reverse()
              .slice(0, 6)
              .map((e, i) => (
                <Link
                  href={`/comment/${e.id}`}
                  key={i}
                  className="bg-white rounded-[15px] p-10 text-black"
                >
                  <div className="bg-black text-white font-[600] text-2xl w-[60px] h-[60px] flex items-center justify-center rounded-full mb-4">
                    0{i + 1}
                  </div>
                  <p>{e.title}</p>
                  <p>Total Comments:{e.comments.length}</p>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAnonyM;
