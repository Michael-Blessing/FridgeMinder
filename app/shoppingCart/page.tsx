"use client";
import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { collection, updateDoc, doc } from "firebase/firestore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const ShoppingCart = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const cartItems = user?.cart;
  const userCollection = collection(db, "users");
  const userDoc = doc(userCollection, user.id);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    updateDoc(userDoc, {
      cart: newCart,
    });
    update({ cart: newCart });
  };
  /*const handleAmountChange = (itemId, event) => {
    const newAmount = event.target.value;
    const newCart = cartItems.map(item =>
      item.id === itemId ? { ...item, amount: newAmount } : item
    );
    updateDoc(userDoc, { cart: newCart });
    update({ cart: newCart });
  };*/

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems?.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Quantity: {item.amount}</p>
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="w-full h-40 object-cover mb-2 rounded-md"
          />
          {/*<input
            type="number"
            value={item.amount}
            onChange={(event) => handleAmountChange(item.id, event)}
      />*/}
          <button onClick={() => removeFromCart(item.id)}>
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
