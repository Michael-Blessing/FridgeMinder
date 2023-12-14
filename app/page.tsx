import ImageUploader from "./components/ImageUploader";
import { auth } from "./auth";
import "../styles/globals.css";

export default async function Home() {
  const session = await auth();

  return <>{session ? <ImageUploader /> : <h4 className="text-2xl">Sign in for features</h4>}</>;
}
