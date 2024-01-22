import React from "react";
import CustomLink from "./customLink";
import { msgType } from "@/utils/types/messageType";

function SingleMessage({ msg }: { msg: msgType }) {
  return (
    <div className="border border-white-100 rounded-[5px] p-2 text-white">
      <div className="flex gap-3">
        <div className="bg-white-100 w-[60px] h-[50px] md:h-[60px] rounded-md flex items-center justify-center">
          {msg.owner?.slice(0, 4)}
        </div>
        <div className="w-full">
          <p className="text-[14px]">{msg.owner?.slice(0, 6)}...</p>
          <div className="mt-3 w-full">
            <p>{msg.title}</p>
            <div className="mt-2 flex gap-x-4">
              <CustomLink route={`/status/${msg.id}`}>
                <p className="text-white-100">Comments:{msg.comments.length}</p>
              </CustomLink>
              <p className="text-white-100">Share</p>
            </div>
          </div>
          {msg.comments.length > 0 && (
            <div className="mt-3 bg-white-100 rounded-md p-2 md:ml-10">
              <p className="border-b mb-4">Lastest comment</p>
              <div>{msg.comments[0]}</div>
              <CustomLink route={`/status/${msg.id}`}>
                <p className="text-white-100">view all</p>
              </CustomLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
