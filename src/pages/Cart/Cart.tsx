import React, { useState } from "react";
import CartItem from "../../components/CartItem/CartItem.tsx";
import styles from "./Cart.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: "Ant-Man and thfffffffffffffffffffffffffffffe Wasp",
      price: 29.0,
      quantity: 1,
    },
    { id: 2, name: "Avengers: Infinity War", price: 29.0, quantity: 1 },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cart}>
      <div className={styles.cartTableSection}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <CartItem
                key={product.id}
                product={product}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.cartActions}>
          <div>
            <input
              type="text"
              placeholder="Coupon code"
              className={styles.couponInput}
            />
            <button className={styles.couponButton}>Apply Coupon</button>
          </div>

          <button className={styles.updateButton}>Update Cart</button>
        </div>
      </div>
      <div className={styles.cartTotalsSection}>
        <div className={styles.cartTotals}>
          <h2>Cart Totals</h2>
          <div className={styles.totalsRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.totalsRow}>
            <span>Total:</span>
            <span style={{ fontWeight: "bold" }}>${subtotal.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
