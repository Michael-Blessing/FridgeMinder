"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { collection, updateDoc, doc } from "firebase/firestore";
import { UserType } from "../../../types/UserType";

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export default function DetailRecipe() {
  const { data: session, update } = useSession();
  const [hoveredId, setHoveredId] = useState<null | number>(null);
  const searchParams = useSearchParams();
  const image: string = searchParams.get("image") as string;
  const title: string = searchParams.get("title") as string;
  const usedIngredientsParams: string = searchParams.get(
    "usedIngredients",
  ) as string;
  const missingIngredientsParams: string = searchParams.get(
    "missedIngredients",
  ) as string;
  const parsedUsedIngredients: Ingredient[] = JSON.parse(usedIngredientsParams);
  const parsedMissedIngredients: Ingredient[] = JSON.parse(
    missingIngredientsParams,
  );

  const addToCart = (ingredientName: string) => {
    if (!session?.user)
      return alert("Please sign in to add ingredients to your cart");
    const user = session?.user as UserType;
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, session?.user?.id);

    if (user.cart.length > 0) {
      updateDoc(userDoc, {
        cart: [...user.cart, ingredientName],
      });
      update({ cart: [...user.cart, ingredientName] });
    } else {
      updateDoc(userDoc, {
        cart: [ingredientName],
      });
      update({ cart: [ingredientName] });
    }
  };

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
          parsedUsedIngredients.map((usedIngredient) => (
            <li
              key={usedIngredient.id}
              className="px-8 relative transform transition duration-500 ease-in-out hover:scale-110"
              onMouseEnter={() => setHoveredId(usedIngredient.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => addToCart(usedIngredient.name)}
            >
              <h4>{`${usedIngredient.name} - ${usedIngredient.amount} ${usedIngredient.unit}`}</h4>
              <div className="relative overflow-hidden">
                <Image
                  src={usedIngredient.image}
                  alt={usedIngredient.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                {hoveredId === usedIngredient.id && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="2x"
                    className="absolute top-0 right-0"
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
      <h3 className="text-xl">Missing Ingredients:</h3>
      <ul className="flex flex-row">
        {parsedMissedIngredients &&
          parsedMissedIngredients.map((missedIngredient) => (
            <li
              key={missedIngredient.id}
              className="px-8 relative transform transition duration-500 ease-in-out hover:scale-110"
              onMouseEnter={() => setHoveredId(missedIngredient.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => addToCart(missedIngredient.name)}
            >
              <h4>{`${missedIngredient.name} - ${missedIngredient.amount} ${missedIngredient.unit}`}</h4>
              <div className="relative overflow-hidden">
                <Image
                  src={missedIngredient.image}
                  alt={missedIngredient.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                {hoveredId === missedIngredient.id && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="2x"
                    className="absolute top-0 right-0"
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
      <Link href="/">Get back</Link>
    </div>
  );
}
