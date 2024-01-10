"use client";

import CustomButton from "@/components/customButton";
import Navbar from "@/components/navbar";
import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { GlobalAppContext } from "@/context/globalContext";
import { checkIfChainIdIsCorrectThenContinue } from "@/utils/function";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React from "react";

function Comment({ params }: { params: { id: string } }) {
  const [comment, setComment] = React.useState("");
  const search = useSearchParams();

  const [loading, setLoading] = React.useState(false);
  const address = search.get("owner");
  const title = search.get("title")?.replaceAll("-", " ");
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        try {
          setLoading(true);
          const ethersProvider = new BrowserProvider(walletProvider!);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          if (comment.trim() == "") throw Error("Comment is required");
          const response = await AnnoyContract.addCommentToMessage(
            comment,
            Number(params.id),
            address
          );
          console.log(response);
          setComment("");
          alert("Comment sent");
        } catch (e) {
          alert(e);
        } finally {
          setLoading(false);
        }
      },
      chainId,
      isConnected,
    });
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Anony Mes your web3 anonymous comment space. Make fun and tell your friend what you think about them"
        />
      </Head>
      <div className="container mx-auto px-4 md:px-24">
        <Navbar />
        <div>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl md:text-6xl text-white">{title}</h1>
          </div>
          <form className="w-full" onSubmit={commentHandler}>
            <textarea
              placeholder="Say your thought..."
              value={comment}
              className="w-full h-[250px] font-[600] text-4xl rounded-md border-0 outlined-0 resize-none p-5 text-black"
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end my-4">
              <CustomButton loading={loading}>Submit Your Comment</CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Comment;
