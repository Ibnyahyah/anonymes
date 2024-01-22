import Image from "next/image";
import React from "react";

import Loader from "@/assets/gifs/loading.gif";

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Image
        src={Loader}
        alt=""
        width={100}
        height={100}
        className="w-[30px] h-[30px] object-contain"
      />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingIndicator;
