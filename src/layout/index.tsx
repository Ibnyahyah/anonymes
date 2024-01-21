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
  const { loadingPageData: boolean } = React.useContext(GlobalAppContext);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Anony Mes your web3 anonymous comment space. Make fun and tell your friend what you think about them"
        />
      </Head>
      <>
        {openCreateProfile && <ProfileComponent />}
        <div className="flex container mx-auto px-5 md:px-24">
          <Sidebar />
          <div className="container mx-auto px-4 md:px-10">
            <Navbar />
            {children}
          </div>
          <RightBar />
        </div>
      </>
    </>
  );
}

export default LayoutTemplate;
