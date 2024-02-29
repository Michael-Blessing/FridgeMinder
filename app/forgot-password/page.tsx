"use client";
import { FormEvent, useState } from "react";
import { passwordReset } from "../firebase";
import "./forgotpassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("User not found, try again!");
        setEmail("");
      }
    }
  };

  return (
    <div className="wrapper">
      {emailMessage ? (
        <h3 className="title">The Email has been sent; Check your Inbox!</h3>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <div>
            <button className="submit" type="submit">
              Reset Your Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
