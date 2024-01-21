import Link from "next/link";
import React from "react";
import { Url } from "url";

type propsType = {
  route: string;
  children: React.ReactNode;
  className?: string;
};

function CustomLink(props: propsType) {
  return (
    <Link href={props.route} className={props.className}>
      {props.children}
    </Link>
  );
}

export default CustomLink;
