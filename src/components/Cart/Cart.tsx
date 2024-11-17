import React, { useState } from "react";
import styles from "./Cart.module.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Ant-Man and the Wasp", price: 29.0, quantity: 1 },
    { id: 2, name: "Avengers: Infinity War", price: 29.0, quantity: 1 },
  ]);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const calculateTotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className={styles.quantityControl}>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.couponContainer}>
            <input
              type="text"
              placeholder="Coupon code"
              className={styles.couponInput}
            />
            <button className={styles.applyCouponButton}>APPLY COUPON</button>
            <button className={styles.updateCartButton}>UPDATE CART</button>
          </div>
        </div>
        <div className={styles.cartTotals}>
          <div className={styles.cartTotalsTitle}>Cart Totals</div>
          <div className={styles.totalContainer}>
            <p>
              Subtotal <span>${calculateTotal()}</span>
            </p>
            <p>
              Total <span>${calculateTotal()}</span>
            </p>
          </div>
          <button className={styles.checkoutButton}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
