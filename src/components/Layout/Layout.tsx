import * as React from "react";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className={inter.className + " h-screen overflow-y-scroll"}>
      <Head>
        <title>Transaction viewer</title>
      </Head>

      {children}
    </div>
  );
}

export default Layout;
