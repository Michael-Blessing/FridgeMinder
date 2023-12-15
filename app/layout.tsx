import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "../provider/SessionProvider";
import { auth } from "./auth";

export const metadata = {
  title: "FridgeMinder",
  description: "Mind your Fridge",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="flex justify-center items-start p-6 min-h-screen bg-purple-200">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
