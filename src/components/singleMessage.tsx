import React from "react";
import CustomLink from "./customLink";
import { commentType, msgType } from "@/utils/types/messageType";
import { GlobalAppContext } from "@/context/globalContext";
import UserAvatar from "./singleComment";
import SingleComment from "./singleComment";

function SingleMessage({ msg }: { msg: msgType }) {
  const {
    comments,
    getComments,
  }: { comments: commentType[]; getComments: (id: number) => void } =
    React.useContext(GlobalAppContext);
  React.useEffect(() => {
    getComments(msg.id);
  }, [msg.id]);
  return (
    <CustomLink route={`/status/${msg.id}`}>
      <div className="border border-white-100 rounded-[5px] p-2 text-white">
        <div className="flex gap-3">
          <div className="bg-white-100 w-[60px] h-[50px] md:h-[60px] rounded-md flex items-center justify-center">
            <img
              loading="lazy"
              src="https://api.dicebear.com/7.x/shapes/svg?radius=10&size=60"
              alt={`${msg.owner} avatar`}
            />
          </div>
          <div className="w-full">
            <p className="text-[14px]">{msg.owner?.slice(0, 6)}...</p>
            <div className="mt-3 w-full">
              <p>{msg.title}</p>
              <div className="mt-2 flex gap-x-4">
                <p className="text-white-100">Comments:{comments?.length}</p>
                <p className="text-white-100">Share</p>
              </div>
            </div>
            {comments?.length > 0 && (
              <div className="mt-3 bg-white-100 rounded-md p-2 md:ml-10">
                <p className="border-b mb-4">Lastest comment</p>
                <SingleComment
                  content={comments[0].content}
                  owner={comments[0].owner}
                />
                <CustomLink route={`/status/${msg.id}`}>
                  <p className="text-white-100">view all</p>
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </CustomLink>
  );
}

export default SingleMessage;
