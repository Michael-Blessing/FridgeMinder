"use client";
import ImageUploader from "./components/ImageUploader";
import { useSession } from "next-auth/react";
import "../styles/globals.css";

export default function Home() {
  const { data: session } = useSession();
  return <>{session ? <ImageUploader /> : <h4>Log in for features</h4>}</>;
}
