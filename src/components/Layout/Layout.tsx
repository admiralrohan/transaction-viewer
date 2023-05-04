import * as React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@components/Header";
import IWrapper from "@interfaces/IWrapper";

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: IWrapper) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Transaction viewer</title>
      </Head>

      <Header />
      <main className="my-8">{children}</main>
    </div>
  );
}

export default Layout;
