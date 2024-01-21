"use client";

import { msgType } from "@/app/create/page";
import CustomButton from "@/components/customButton";
import CustomLink from "@/components/customLink";
import TextFields from "@/components/inputFields";
import Navbar from "@/components/navbar";
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
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function GetComment({ params }: { params: { id: string } }) {
  const route = useRouter();
  const {
    getMessage,
    message,
  }: { getMessage: (id: string) => void; message: msgType } =
    React.useContext(GlobalAppContext);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [writeComment, setWriteComment] = useState(false);

  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected) {
      getMessage(params.id);
    }
  }, [params.id, isConnected, getMessage]);

  function writeCommentHandler(e: React.FormEvent<HTMLFormElement>) {
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
            Number(params.id)
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
    <LayoutTemplate title={message?.title ?? ""}>
      {message == undefined ? (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-2xl text-white text-center">Not Found😫</h1>
            <CustomButton onClick={() => route.back()}>Go Back</CustomButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-10 flex-wrap md:flex-nowrap">
            <h1 className="text-2xl md:text-5xl text-white">
              {message?.title}
            </h1>
          </div>
          <div className="flex gap-x-4">
            <CustomButton
              onClick={() => {
                setWriteComment((prev) => !prev);
              }}
            >
              Write a comment
            </CustomButton>
            <CustomButton
              onClick={() => {
                const url = `${window.location.host}/comment/${params.id}}`;
                window.navigator.clipboard
                  .writeText(url)
                  .then((_) => alert("Link Copied"));
              }}
            >
              Share Link With Friend
            </CustomButton>
          </div>
          <div className="my-10 border border-white-100 p-4">
            <div className="flex gap-x-4">
              <h1>Comments</h1>
              <p>{message?.comments.length}</p>
            </div>
            {writeComment && (
              <form
                className="w-full border border-white-100 rounded-md p-2 mt-2"
                onSubmit={writeCommentHandler}
              >
                <TextFields
                  placeholder="Write on your comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <div className="flex justify-end mt-4">
                  <CustomButton loading={loading}>Submit</CustomButton>
                </div>
              </form>
            )}
            {(message?.comments ?? []).length <= 0 ? (
              <p className="text-center my-10">No Comment yet</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 mt-2">
                {message?.comments.slice(0, 6).map((e, i) => (
                  <div
                    className="mt-3 border border-white-100 rounded-sm p-4"
                    key={i}
                  >
                    <p>
                      {e.length > 200 ? `${e.substring(0, 200)}...` : e}{" "}
                      {e.length > 200 && <span>see more</span>}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutTemplate>
  );
}

export default GetComment;
