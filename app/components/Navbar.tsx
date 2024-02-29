"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserType } from "../../types/UserType";
import "./styles/Navbar.css"
import LogoutIcon from "./styles/images/LogoutIcon";


export default function Navbar() {
  const { data: session, update } = useSession();
  const user = session?.user as UserType;

  return (
    <nav className="navbar">
      <div className="logo">
        {user ? (
          <a href="/" className="logo">
            FridgeMinder
          </a>
        ) :
          <a href="/" className="logo">
            Sign in for functinons
          </a>
        }
      </div>
      <div>
        {user ? (
          <h6 className="welcome-msg">Welcome, {user.name}</h6>
        ) : null
        }
      </div>

      <div className="profile-and-cart">

        <div className="shoppingcart-and-number">
          {user ? (
            <div>

              <Link
                style={{ position: "relative", padding: "0 2em 0 0" }}
                href={{ pathname: `/shoppingCart` }}
              >
                <div className="shopping-cart">
                  {user.cart.length}
                </div>

                <FontAwesomeIcon icon={faCartShopping} size="2x" />
              </Link>
            </div>
          ) : (
            <a href="/api/auth/signin" className="sign-in-msg">
              Sign In
            </a>
          )}
        </div>
        <div className="profile-and-signout">
          {user ? (<div className="profile-picture">
            <Image
              src={user.image}
              alt="user profile picture"
              width={75}
              height={75}
            />
          </div>) : null
          }
          {user ? (<div>

            <a href="/api/auth/signout" className="sign-out">
              <LogoutIcon />
            </a>
          </div>) : null
          }
        </div>

      </div>
    </nav>
  );
}
