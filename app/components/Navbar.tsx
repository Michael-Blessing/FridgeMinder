import { auth } from "../auth";
import Image from "next/image";

interface UserType {
  name: string;
  image: string;
}

export default async function Navbar() {
  const session = await auth();
  const user = session?.user as UserType;
  return (
    <nav className="flex justify-between items-center w-full h-28 px-6 bg-gradient-to-b from-pink-200 to-purple-100">
      <div className="flex items-center">
        <a href="/" className="text-3xl font-bold text-blue-700">
          FridgeMinder
        </a>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="flex flex-container flex-row items-center">
            <h6 className="text-lg font-bold pr-8">
              Welcome, {user.name}
            </h6>
            <div className="flex flex-col">
              <Image
                src={user.image}
                alt="user profile picture"
                width={75}
                height={75}
              />
              <a href="/api/auth/signout" className="text-lg font-bold border-2 rounded-lg border-purple-400 hover:bg-gradient-to-r from-purple-800 to-blue-800 hover:text-white hover:border-pink-200 p-1">
                Sign Out
              </a>
            </div>
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
