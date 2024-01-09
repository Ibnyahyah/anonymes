"use client";

import { msgType } from "@/app/create/page";
import CustomButton from "@/components/customButton";
import Navbar from "@/components/navbar";
import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { GlobalAppContext } from "@/context/globalContext";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

function GetComment({ params }: { params: { id: string } }) {
  const { messages }: { messages: msgType[] } =
    React.useContext(GlobalAppContext);
  const [message, setMessage] = useState<msgType>();
  const { isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected) {
      const _message = messages.find((e) => e.id == Number(params.id));
      if (_message) {
        setMessage(_message);
      }
    }
  }, [messages, params.id, isConnected]);
  return (
    <div className="container mx-auto px-24">
      <Navbar />
      <div>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl md:text-6xl text-white">{message?.title}</h1>
          <p>
            Total Comment:
            <br />
            {message?.comments.length}
          </p>
        </div>
        <CustomButton
          onClick={() => {
            const url = `${window.location.host}/comment/create/${params.id}?owner=${message?.owner}`;
            window.navigator.clipboard
              .writeText(url)
              .then((_) => alert("Link Copied"));
          }}
        >
          Share Link With Friend
        </CustomButton>
        <div className="my-10">
          <h1>Comments</h1>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            {message?.comments.slice(0, 6).map((e, i) => (
              <div key={i} className="bg-white rounded-[15px] p-10 text-black">
                <div className="bg-black text-white font-[600] text-2xl w-[60px] h-[60px] flex items-center justify-center rounded-full mb-4">
                  0{i + 1}
                </div>
                <p>{e.length > 200 ? `${e.substring(0, 200)}...` : e}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetComment;
