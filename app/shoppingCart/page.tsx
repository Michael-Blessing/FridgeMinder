import React, { useContext } from "react";
import { useSession } from "next-auth/react";

const ShoppingCart = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const cartItems = user?.cart;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
