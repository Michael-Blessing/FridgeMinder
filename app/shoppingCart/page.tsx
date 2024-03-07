"use client";
import "../../styles/globals.css";
import React from "react";
import { useSession } from "next-auth/react";
import { collection, updateDoc, doc } from "firebase/firestore";
import { faX, faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { db } from "../firebase";
import { jsPDF } from "jspdf";
import { Cart } from "../../types/CartType";
import "./shoppingCart.css";

const ShoppingCart = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const cartItems = user?.cart as Cart[];
  const userId = user?.id;
  if (!userId) return null;
  const userCollection = collection(db, "users");
  const userDoc = doc(userCollection, user.id);

  const exportToTxt = () => {
    const cartText = cartItems
      .map((item) => `${item.name} - Quantity: ${item.amount} ${item.unit}`)
      .join("\n");
    const blob = new Blob([cartText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping_cart.txt";
    link.click();
  };

  const exportToPdf = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;

    let currentY = 20; // Adjusted initial Y position for top margin

    cartItems.forEach((item, index) => {
      // Check if there is enough space for the current item on the current page
      if (currentY > pdf.internal.pageSize.height - 50) {
        // Add a new page if there's not enough space
        pdf.addPage();
        currentY = 20; // Reset the Y position for the new page with top margin
      }

      // Styling for the text
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0); // Set text color to black

      // Calculate the center position for the text
      const centerX = 50;

      // List the cart items in the pdf with their name and amount and image
      pdf.text(item.name, centerX, currentY); // Centered X position
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Quantity: ${item.amount} ${item.unit}`, centerX, currentY + 10); // Centered X position
      pdf.addImage(item.image, "JPEG", 10, currentY + 15, 40, 40); // Adjusted Y position

      // Update the Y position for the next item
      currentY += 70; // Add some spacing between items
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
    name: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const newCart = cartItems.map((item) => {
      if (item.id === id || item.name === name) {
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
    <div className="super-container">
      <div className="container">
        <h1 className="title">Shopping Cart</h1>
        {cartItems?.map((item) => (
          <div key={item.id} className="item-wrapper">
            <div className="item">
              <p className="item-name">{item.name}</p>
              <p className="item-quantity">
                Quantity:{" "}
                <input
                  type="number"
                  value={item.amount}
                  onChange={(event) =>
                    handleAmountChange(item.id, item.name, event)
                  }
                  className=""
                />
                {item.unit}
              </p>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="item-image"
              />
            </div>
            <button onClick={() => removeFromCart(item.id)} className="delete">
              <FontAwesomeIcon icon={faX} size="2x" />
            </button>
          </div>
        ))}
        <div className="button-container">
          <button onClick={exportToTxt} className="export-txt">
            Export as TXT
            <FontAwesomeIcon icon={faFileLines} size="2x" />
          </button>
          <button onClick={exportToPdf} className="export-pdf">
            Export as PDF
            <FontAwesomeIcon icon={faFilePdf} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
