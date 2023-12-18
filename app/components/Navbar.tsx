"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserType } from "../../types/UserType";

export default function Navbar() {
  const { data: session, update } = useSession();
  const user = session?.user as UserType;

  return (
    <nav className="flex justify-between items-center w-full h-28 px-6 bg-gradient-to-b from-pink-200 to-purple-200">
      <div className="flex items-center">
        <a href="/" className="text-3xl font-bold text-blue-700">
          FridgeMinder
        </a>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="flex flex-container flex-row items-center">
            <h6 className="text-lg font-bold pr-8">Welcome, {user.name}</h6>
            <Link
              style={{ position: "relative", padding: "0 2em 0 0" }}
              href={{ pathname: `/shoppingCart` }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "10px",
                  background: "red",
                  borderRadius: "50%",
                  color: "white",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user.cart.length}
              </div>
              <FontAwesomeIcon icon={faCartShopping} size="2x" />
            </Link>
            <div className="flex flex-col">
              <Image
                src={user.image}
                alt="user profile picture"
                width={75}
                height={75}
              />
              <a
                href="/api/auth/signout"
                className="text-lg font-bold border-2 rounded-lg border-purple-400 hover:bg-gradient-to-r from-purple-800 to-blue-800 hover:text-white hover:border-pink-200 p-1"
              >
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <a href="/api/auth/signin" className="text-lg font-bold border-2 rounded-lg border-purple-400 hover:bg-gradient-to-r from-purple-800 to-blue-800 hover:text-white hover:border-pink-200 p-1">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
