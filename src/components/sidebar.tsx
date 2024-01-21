import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CustomButton from "./customButton";
import { GlobalAppContext } from "@/context/globalContext";

function Sidebar() {
  const { toggleSideBar, sideBarOpen } = React.useContext(GlobalAppContext);
  const pathname = usePathname();

  return (
    <div
      className={`${
        sideBarOpen ? "flex absolute" : "hidden"
      } md:flex bg-black md:static w-screen md:w-[25%] h-screen  p-4 md:p-10 flex-col justify-between items-start`}
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
            <li
              key={i}
              className={` p-4 py-2 w-full ${
                pathname.includes(l.route) ? "bg-white-100" : ""
              } rounded-md cursor-pointer hover:bg-white-100`}
            >
              {l.title}
            </li>
          ))}
        </ul>
      </div>
      <CustomButton>Logout</CustomButton>
    </div>
  );
}

export default Sidebar;
