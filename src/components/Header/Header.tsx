import * as React from "react";

function Header() {
  return (
    <header className="flex h-12 items-center justify-center bg-gray-800">
      <h1
        className="flex items-baseline gap-2
        whitespace-nowrap text-xl text-white"
      >
        Transaction Viewer
      </h1>
    </header>
  );
}

export default Header;
