"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faPlus, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { collection, updateDoc, doc } from "firebase/firestore";
import { UserType } from "../../../types/UserType";
import { Cart } from "../../../types/CartType";
import { Ingredient } from "../../../types/IngredientType";
import "./detail.css";

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

  const addEverythingToCart = (type: string) => {
    if (!session?.user)
      return alert("Please sign in to add ingredients to your cart");
    const user = session?.user as UserType;
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, user.id);
    if (type === "used") {
      const newCart = user.cart.concat(parsedUsedIngredients);
      updateDoc(userDoc, {
        cart: newCart,
      });
      update({ cart: newCart });
    } else if (type === "missed") {
      const newCart = user.cart.concat(parsedMissedIngredients);
      updateDoc(userDoc, {
        cart: newCart,
      });
      update({ cart: newCart });
    } else {
      return;
    }
  };

  const addToCart = (ingredient: Ingredient) => {
    if (!session?.user)
      return alert("Please sign in to add ingredients to your cart");
    const user = session?.user as UserType;
    const userCollection = collection(db, "users");
    const userDoc = doc(userCollection, user.id);
    const { name, id, image, amount } = ingredient as Cart;

    if (user.cart.length > 0) {
      const ingredientInCart = user.cart.find((item) => item.id === id);
      if (ingredientInCart) {
        const newCart = user.cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        updateDoc(userDoc, {
          cart: newCart,
        });
        update({ cart: newCart });
        return;
      } else {
        updateDoc(userDoc, {
          cart: [...user.cart, { name, id, image, amount }],
        });
        update({ cart: [...user.cart, { name, id, image, amount }] });
      }
    } else {
      updateDoc(userDoc, {
        cart: [{ name, id, image, amount }],
      });
      update({ cart: [{ name, id, image, amount }] });
    }
  };

  return (
    <div className="super-container">
      <div className="recipe-card">
        <div className="adv-recipe">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="WIDE-IMAGE"
          />
          <h2 className="">{title}</h2>
        </div>
        <h3 className="">Used Ingredients:</h3>
        <button
          onClick={() => addEverythingToCart("used")}
          className="btn-primary"
        >
          Add all used to cart
          <FontAwesomeIcon
            icon={faListCheck}
            size="2x"
            className="fa-list-check"
          />
        </button>
        <ul className="ingredient-list">
          {parsedUsedIngredients &&
            parsedUsedIngredients.map((usedIngredient) => (
              <li
                key={usedIngredient.id}
                className="ingredient-item"
                onMouseEnter={() => setHoveredId(usedIngredient.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => addToCart(usedIngredient)}
              >
                <h4 className="ing-name">{`${usedIngredient.name} - ${usedIngredient.amount} ${usedIngredient.unit}`}</h4>
                <div className="image-container">
                  <Image
                    src={usedIngredient.image}
                    alt={usedIngredient.name}
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                  {hoveredId === usedIngredient.id && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="2x"
                      className="plus-icon"
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
        <h3 className="">Missing Ingredients:</h3>
        <button
          onClick={() => addEverythingToCart("missed")}
          className="btn-primary"
        >
          Add all missing to cart
          <FontAwesomeIcon
            icon={faListCheck}
            size="2x"
            className="fa-list-check"
          />
        </button>
        <ul className="ingredient-list">
          {parsedMissedIngredients &&
            parsedMissedIngredients.map((missedIngredient) => (
              <li
                key={missedIngredient.id}
                className="ingredient-item"
                onMouseEnter={() => setHoveredId(missedIngredient.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => addToCart(missedIngredient)}
              >
                <h4 className="ing-name">{`${missedIngredient.name} - ${missedIngredient.amount} ${missedIngredient.unit}`}</h4>
                <div className="image-container">
                  <Image
                    src={missedIngredient.image}
                    alt={missedIngredient.name}
                    width={150}
                    height={150}
                    className="rounded-md"
                  />
                  {hoveredId === missedIngredient.id && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="2x"
                      className="plus-icon"
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
        <Link href="/" className="btn-primary">
          Get back
        </Link>
      </div>
    </div>
  );
}
