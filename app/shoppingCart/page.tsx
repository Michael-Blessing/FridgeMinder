"use client";
import "../../styles/globals.css";
import React from "react";
import { useSession } from "next-auth/react";
import { collection, updateDoc, doc } from "firebase/firestore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { db } from "../firebase";
import { jsPDF } from "jspdf";

const ShoppingCart = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const cartItems = user?.cart;
  const userCollection = collection(db, "users");
  const userDoc = doc(userCollection, user.id);

  const exportToTxt = () => {
    const cartText = cartItems
      .map((item) => `${item.name} - Quantity: ${item.amount}`)
      .join("\n");
    const blob = new Blob([cartText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping_cart.txt";
    link.click();
  };

  const exportToPdf = () => {
    const pdf = new jsPDF();
    cartItems.forEach((item, index) => {
      pdf.text(
        `${index + 1}. ${item.name} - Quantity: ${item.amount}`,
        10,
        10 + index * 10,
      );
    });
    pdf.save("shopping_cart.pdf");
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    updateDoc(userDoc, {
      cart: newCart,
    });
    update({ cart: newCart });
  };

  function handleAmountChange(
    id: any,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: parseInt(event.target.value) };
      }
      return item;
    });
    updateDoc(userDoc, {
      cart: newCart,
    });
    update({ cart: newCart });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems?.map((item) => (
        <div key={item.id} className="mb-4 border-b-2 pb-4">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-gray-600">
            Quantity:{" "}
            <input
              type="number"
              value={item.amount}
              onChange={(event) => handleAmountChange(item.id, event)}
              className="border rounded-md px-2 py-1"
            />
          </p>
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="w-full h-40 object-cover mb-2 rounded-md"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </button>
        </div>
      ))}
      <button
        onClick={exportToTxt}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Export as TXT
      </button>
      <button
        onClick={exportToPdf}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ShoppingCart;
