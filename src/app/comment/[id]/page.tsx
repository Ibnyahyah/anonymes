"use client";

import { msgType } from "@/app/create/page";
import CustomButton from "@/components/customButton";
import Navbar from "@/components/navbar";
import { GlobalAppContext } from "@/context/globalContext";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

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
    <>
      <Head>
        <title>{message?.title}</title>
        <meta
          name="description"
          content="Anony Mes your web3 anonymous comment space. Make fun and tell your friend what you think about them"
        />
      </Head>
      <div className="container mx-auto px-24">
        <Navbar />
        <div>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl md:text-6xl text-white">
              {message?.title}
            </h1>
            <p>
              Total Comment:
              <br />
              {message?.comments.length}
            </p>
          </div>
          <CustomButton
            onClick={() => {
              const url = `${window.location.host}/comment/add/${
                params.id
              }?owner=${message?.owner}&title=${message?.title.replaceAll(
                " ",
                "-"
              )}`;
              window.navigator.clipboard
                .writeText(url)
                .then((_) => alert("Link Copied"));
            }}
          >
            Share Link With Friend
          </CustomButton>
          <div className="my-10">
            <h1>Comments</h1>
            {(message?.comments ?? []).length <= 0 ? (
              <p className="text-center my-10">No Comment yet</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-5 mt-5">
                {message?.comments.slice(0, 6).map((e, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[15px] p-10 text-black"
                  >
                    <div className="bg-black text-white font-[600] text-2xl w-[60px] h-[60px] flex items-center justify-center rounded-full mb-4">
                      0{i + 1}
                    </div>
                    <p>{e.length > 200 ? `${e.substring(0, 200)}...` : e}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GetComment;
