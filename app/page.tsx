import ImageUploader from "./components/ImageUploader";
import { auth } from "./auth";
import "../styles/globals.css";

export default async function Home() {
  const session = await auth();

  return <>{session ? <ImageUploader /> : <h4>Log in for features</h4>}</>;
}
