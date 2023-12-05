import { useRouter } from "next/router";
import Link from "next/link";

export default function Page({ params }: { params: { id: any } }) {
  return <div>My Post: {params.id}</div>;
}



