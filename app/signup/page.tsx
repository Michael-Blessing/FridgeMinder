"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { firebaseAuth } from "../firebase";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { signIn } from "next-auth/react";
import "../../styles/globals.css";

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
    create_user(user);

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  function create_user(user: any) {
    const base_user: any = {
      name: user?.email,
      image: user?.photoURL || "",
      email: user?.email || "",
      cart: [],
      emailVertified: user?.emailVerified || null,
    };

    setDoc(doc(db, "users", user.uid), base_user, { merge: true });
  }

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="">Sign up</h2>
        </div>

        <div className="">
          <div className="">
            <div>
              <label htmlFor="email" className="">
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=""
                />
              </div>
            </div>

            <div>
              <div className="">
                <label htmlFor="password" className="">
                  Password
                </label>
              </div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className=""
                />
              </div>
            </div>
            <div>
              <div className="">
                <label htmlFor="password" className="">
                  Password Again
                </label>
              </div>
              <div className="">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className=""
                />
              </div>
            </div>

            <div>
              <button
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                onClick={() => signup()}
                className=""
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
