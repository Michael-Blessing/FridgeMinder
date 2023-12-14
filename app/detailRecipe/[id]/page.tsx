"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const image: string = searchParams.get("image") as string;
  const title: string = searchParams.get("title") as string;
  const usedIngredients: string = searchParams.get("usedIngredients") as string;
  const missedIngredients: string = searchParams.get(
    "missedIngredients",
  ) as string;
  const parsedUsedIngredients: Ingredient[] = JSON.parse(usedIngredients);
  const parsedMissedIngredients: Ingredient[] = JSON.parse(missedIngredients);

  return (
    <div className="bg-purple-200 rounded-md shadow-md m-4 w-80 min-w-full">
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="rounded-md"
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <h3 className="text-xl">Used Ingredients:</h3>
      <ul className="flex flex-row">
        {parsedUsedIngredients &&
          parsedUsedIngredients.map((usedIngredients) => (
            <li key={usedIngredients.id} className="px-8">
              <h4>{`${usedIngredients.name} - ${usedIngredients.amount} ${usedIngredients.unit}`}</h4>
              <Image
                src={usedIngredients.image}
                alt={usedIngredients.name}
                height={200}
                width={200}
                className="rounded-md"
              />
            </li>
          ))}
      </ul>
      <h3 className="text-xl">Missing Ingredients:</h3>
      <ul className="flex flex-row">
        {parsedMissedIngredients &&
          parsedMissedIngredients.map((missedIngredients) => (
            <li key={missedIngredients.id} className="px-8">
              <h4>{`${missedIngredients.name} - ${missedIngredients.amount} ${missedIngredients.unit}`}</h4>
              <Image
                src={missedIngredients.image}
                alt={missedIngredients.name}
                width={200}
                height={200}
                className="rounded-md"
              />
            </li>
          ))}
      </ul>
      <Link href="/">Get back</Link>
    </div>
  );
}
