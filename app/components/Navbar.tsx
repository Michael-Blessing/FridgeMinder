import { auth } from "../auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center w-full h-16 px-6 bg-gray-100">
      <div className="flex items-center">
        <a href="/" className="text-xl font-bold">
          FridgeMinder
        </a>
      </div>
      <div className="flex items-center">
        {session ? (
          <div className="flex flex-container flex-row">
            <h6 className="text-lg font-bold">
              Welcome, {session?.user?.name}
            </h6>
            <Image
              src={session?.user?.image}
              alt="user profile picture"
              width={75}
              height={75}
            />
            <a href="/api/auth/signout" className="text-lg font-bold">
              Sign Out
            </a>
          </div>
        ) : (
          <a href="/api/auth/signin" className="text-lg font-bold">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
