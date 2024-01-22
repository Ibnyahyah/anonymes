import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import CustomButton from "./customButton";
import { GlobalAppContext } from "@/context/globalContext";
import CustomLink from "./customLink";
import { useWeb3Modal } from "@web3modal/ethers/react";

function Sidebar() {
  const router = useRouter();
  const { toggleSideBar, sideBarOpen } = React.useContext(GlobalAppContext);
  const pathname = usePathname();

  const { close } = useWeb3Modal();

  return (
    <div
      className={`${
        sideBarOpen ? "flex absolute md:sticky" : "hidden top-0 sticky"
      } md:flex bg-black md:static w-[60%] md:w-[25%] h-screen  p-4 md:p-10 flex-col justify-between items-start`}
    >
      <div>
        <header>
          <Link href="/" className="text-2xl font-[800] text-green">
            ANONY<span className="font-[300] text-[16px] text-white">m</span>
          </Link>
        </header>
        <ul className="flex flex-col gap-y-10 mt-24">
          {[
            {
              title: "Home",
              route: "/create",
            },
            {
              title: "Profile",
              route: "/profile",
            },
            {
              title: "Settings",
              route: "/settings",
            },
            {
              title: "Analytics",
              route: "/analytics",
            },
            {
              title: "About AMES",
              route: "/ames",
            },
            {
              title: "FAQs",
              route: "/faqs",
            },
          ].map((l, i) => (
            <CustomLink key={i} route={l.route}>
              <li
                key={i}
                className={` p-4 py-2 w-full ${
                  pathname.includes(l.route) ? "bg-white-100" : ""
                } rounded-md cursor-pointer hover:bg-white-100`}
              >
                {l.title}
              </li>
            </CustomLink>
          ))}
        </ul>
      </div>
      <CustomButton
        onClick={() => {
          close();
          router.replace("/");
        }}
      >
        Logout
      </CustomButton>
    </div>
  );
}

export default Sidebar;
