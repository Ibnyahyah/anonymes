"use client";

import CreateMessageForm from "@/components/createMessageForm";
import { msgType } from "@/utils/types/messageType";
import { GlobalAppContext } from "@/context/globalContext";
import LayoutTemplate from "@/layout";
import React from "react";
import SingleMessage from "@/components/singleMessage";

function CreateAnonyM() {
  const {
    messages,
  }: {
    messages: msgType[];
  } = React.useContext(GlobalAppContext);

  const [openCreateProfile, setOpenCreateProfile] = React.useState(false);

  return (
    <LayoutTemplate
      title="Create Your Anonymes"
      openCreateProfile={openCreateProfile}
    >
      <CreateMessageForm setOpenCreateProfile={setOpenCreateProfile} />
      <div className="my-10">
        <h1>Messages</h1>
        {messages.length <= 0 ? (
          <p className="text-center my-10">No messages</p>
        ) : (
          <div className="grid gap-5 mt-5">
            {messages.map((e, i) => (
              <SingleMessage msg={e} key={i} />
            ))}
          </div>
        )}
      </div>
    </LayoutTemplate>
  );
}

export default CreateAnonyM;
