"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { firebaseAuth } from "../firebase";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { signIn } from "next-auth/react";
import "../../styles/globals.css";
import "./signup.css";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");

  async function signup() {
    let user: any = null;
    await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (res) => {
        user = res.user;
      },
    );
    await create_user(user);

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }
  async function getRandomUserImage() {
    try {
      const response = await fetch("https://api.dicebear.com/7.x/thumbs/svg");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch random user image. Status: ${response.status}`,
        );
      }

      console.log(response);
      const ImageUrl = response.url;

      return ImageUrl;
    } catch (error) {
      console.error("Error fetching random user image:", error.message);
    }
  }

  async function create_user(user: any) {
    if (!user) return;

    // fetch userImage from API

    const imageUrl = await getRandomUserImage();

    const base_user: any = {
      name: user?.email,
      image: user?.photoURL ? user.photoURL : imageUrl ? imageUrl : "",
      email: user?.email || "",
      cart: [],
      emailVertified: user?.emailVerified || null,
    };

    setDoc(doc(db, "users", user.uid), base_user, { merge: true });
  }

  return (
    <>
      <div className="super-container">
        <div className="aspect-container">
          <div className="text-container">
            <h2 className="title">Sign up</h2>
          </div>
          <div className="fourth-container">
            <div className="tiny-container">
              <label htmlFor="email" className="label-text">
                Email address
              </label>
              <div className="input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="tiny-container">
              <div>
                <label htmlFor="password" className="label-text">
                  Password
                </label>
              </div>
              <div className="input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>
            <div className="tiny-container">
              <div>
                <label htmlFor="password" className="label-text">
                  Password Again
                </label>
              </div>
              <div className="input-container">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="buetton-container">
              <button
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                onClick={() => signup()}
                className="buetton"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
