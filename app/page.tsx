"use client";
import ImageUploader from "./components/ImageUploader";
import { useSession } from "next-auth/react";
import "../styles/globals.css";
import "./components/styles/mainpage.css";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="main">
      {session ? <ImageUploader /> : <h4 className="text">Fridgeminder</h4>}
    </div>
  );
}
