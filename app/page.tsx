"use client";
import ImageUploader from "./components/ImageUploader";
import { useSession } from "next-auth/react";
import "../styles/globals.css";

<<<<<<< HEAD
export default function Home() {
  const { data: session } = useSession();
  return <>{session ? <ImageUploader /> : <h4>Log in for features</h4>}</>;
=======
export default async function Home() {
  const session = await auth();

  return <>{session ? <ImageUploader /> : <h4 className="text-2xl">Sign in for features</h4>}</>;
>>>>>>> 0889954e9dfaa51f4304ad72eb80a38f077ef474
}
