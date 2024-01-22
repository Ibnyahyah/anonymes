"use client";

import React from "react";
import Head from "next/head";

import Navbar from "@/components/navbar";
import RightBar from "@/components/rightBar";
import Sidebar from "@/components/sidebar";
import ProfileComponent from "@/components/profileComponent";
import { GlobalAppContext } from "@/context/globalContext";

function LayoutTemplate({
  children,
  title,
  openCreateProfile = false,
}: {
  children: React.ReactNode;
  title: string;
  openCreateProfile?: boolean;
}) {
  React.useEffect(() => {
    document.title = `${title} - Anonymes`;
  }, [title]);

  const { setSideBarOpen, sideBarOpen } = React.useContext(GlobalAppContext);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Anony Mes your web3 anonymous comment space. Make fun and tell your friend what you think about them"
        />
      </Head>
      <div className="h-screen overflow-hidden" style={{ overflowY: "hidden" }}>
        {openCreateProfile && <ProfileComponent />}
        <div
          className="flex container mx-auto px-5 md:px-24 "
          onClick={() => {
            if (!sideBarOpen) return;
            setSideBarOpen(false);
          }}
        >
          <Sidebar />
          <div
            className="container mx-auto px-4 md:px-10 flex flex-col h-screen"
            style={{ overflowY: "auto" }}
          >
            <Navbar />
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
}

export default LayoutTemplate;
