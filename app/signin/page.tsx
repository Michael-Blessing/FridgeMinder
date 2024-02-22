"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="">
        <div className="">
          <h2 className="">Sign in to your account</h2>
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
                <div className="">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className=""
                  >
                    Forgot password?
                  </div>
                </div>
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
              <button
                onClick={() =>
                  signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
                disabled={!email || !password}
                className=""
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="">
            Not a member?{" "}
            <button onClick={() => router.push("signup")} className="">
              Sign Up
            </button>
          </p>
          <div className="">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className=""
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Sign in with
              Google
            </button>

            <button
              onClick={() => signIn("twitter", { callbackUrl: "/" })}
              className=""
            >
              <FontAwesomeIcon icon={faTwitter} className="mr-2" /> Sign in with
              Twitter
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className=""
            >
              <FontAwesomeIcon icon={faGithub} className="" /> Sign in with
              GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
