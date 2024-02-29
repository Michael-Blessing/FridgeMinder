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
import "./signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="super-container">
        <div className="aspect-container">
          <div className="text-container">
            <h2 className="title">Login</h2>
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
              <div className="">
                <label htmlFor="password" className="label-text">
                  Password
                </label>
                <div className="">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className="link-text"
                  >
                    Forgot password?
                  </div>
                </div>
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

            <div className="buetton-container">
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
                className="buetton"
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="buetton-container">
            <p className="label-text">
              Not a member?{" "}
              <button onClick={() => router.push("signup")} className="buetton">
                Sign Up
              </button>
            </p>
          </div>
          <div className="buetton-container">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="buetton, buetton-google"
            >
              <FontAwesomeIcon icon={faGoogle} className="buetton-icon" /> Sign in with
              Google
            </button>

            <button
              onClick={() => signIn("twitter", { callbackUrl: "/" })}
              className="buetton-twitter"
            >
              <FontAwesomeIcon icon={faTwitter} className="buetton-icon" /> Sign in with
              Twitter
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="buetton-github"
            >
              <FontAwesomeIcon icon={faGithub} className="buetton-icon" /> Sign in with
              GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
