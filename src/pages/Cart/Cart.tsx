import React, { useState } from "react";
import CartItem from "../../components/CartItem/CartItem.tsx";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: "Ant-Man and the Wasp",
      price: 29.0,
    },
    { id: 2, name: "Avengers: Infinity War", price: 29.0 },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const coupons = [
    { code: "SAVE10", discount: 10 },
    { code: "SAVE20", discount: 20 },
    { code: "FREESHIP", discount: 5 },
  ];

  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  const total = subtotal + 5 - discount;

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon) {
      setDiscount(coupon.discount);
      setAppliedCoupon(coupon.code);
      alert(`Coupon "${coupon.code}" applied!`);
    } else {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cartTableSection}>
        <table className={styles.cartTable}>
          <colgroup>
            <col className={styles.colRemoveButton} />
            <col className={styles.colProduct} />
            <col className={styles.colPrice} />
            <col className={styles.colQuantity} />
            <col className={styles.colTotal} />
          </colgroup>
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
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
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
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className={styles.couponButton} onClick={applyCoupon}>
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
      <div className={styles.cartTotalsSection}>
        <div className={styles.cartTotals}>
          <h2>Cart Totals</h2>
          <div className={styles.totalsRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className={styles.totalsRow}>
              <span>Discount ({appliedCoupon}):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className={styles.totalsRow}>
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div className={styles.totalsRow}>
            <span>Total:</span>
            <span style={{ fontWeight: "bold" }}>${total.toFixed(2)}</span>
          </div>
          <Link to={`/checkout?total=${total}`}>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
