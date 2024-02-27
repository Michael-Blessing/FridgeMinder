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
    <nav className="">
      <div className="">
        <a href="/" className="">
          FridgeMinder
        </a>
      </div>
      <div className="">
        {user ? (
          <div className="">
            <h6 className="">Welcome, {user.name}</h6>
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
            <div className="">
              <Image
                src={user.image}
                alt="user profile picture"
                width={75}
                height={75}
              />
              <a href="/api/auth/signout" className="">
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <a href="/api/auth/signin" className="">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
