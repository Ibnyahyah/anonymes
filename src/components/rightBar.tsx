import React from "react";

function RightBar() {
  return (
    <div className="h-screen w-screen bg-black md:w-[30%] py-10 hidden md:block absolute md:static px-4 md:px-0">
      <header className="mb-8">
        <h1>Recent Post</h1>
      </header>
      {[0, 0].map((e, i) => (
        <div className="border-t border-t-white-100 py-4" key={i}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
            illo nobis molestias quas...
          </p>
          <p className="text-white-100 text-[13px]">owner: 0xp...</p>
        </div>
      ))}
    </div>
  );
}

export default RightBar;
