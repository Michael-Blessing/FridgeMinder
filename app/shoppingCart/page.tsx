"use client";
import React, { useContext } from "react";
import { useSession } from "next-auth/react";

const ShoppingCart = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const cartItems = user?.cart;
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems?.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
