import { GlobalAppContext } from "@/context/globalContext";
import { msgType } from "@/utils/types/messageType";
import React from "react";
import CustomLink from "./customLink";

function RightBar() {
  const {
    messages,
  }: {
    messages: msgType[];
  } = React.useContext(GlobalAppContext);

  return (
    <div className="h-screen w-screen bg-black md:w-[30%] py-10 hidden md:block absolute md:static px-4 md:px-0">
      <header className="mb-8">
        <h1>Recent Post</h1>
      </header>
      {messages.slice(0, 5).map((e, i) => (
        <CustomLink route={`/status/${e.id}`} key={i}>
          <div className="border-t border-t-white-100 py-4">
            <p>{e?.title}</p>
            <p className="text-white-100 text-[13px]">
              owner: {e?.owner?.slice(0, 5)}...
            </p>
          </div>
        </CustomLink>
      ))}
    </div>
  );
}

export default RightBar;
