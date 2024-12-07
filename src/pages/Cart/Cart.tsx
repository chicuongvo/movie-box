import React, { useState, useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem.tsx";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext.tsx";
import { useCart } from "../../contexts/cartContext";

const API_URL = "https://backend-movie-app-0pio.onrender.com";

interface Product {
  name: string;
  id: string;
  price: string;
  _id: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const { username } = useUser() || {};
  const {
    discount,
    setDiscount,
    appliedCoupon,
    setAppliedCoupon,
    total,
    setTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      if (!username) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/user/${username}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setCart(
          Array.isArray(data.data.shoppingCart) ? data.data.shoppingCart : []
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, [username]);

  async function removeItem(id: string) {
    if (!username) return;

    const itemToRemove = cart.find((item) => item.id === id);
    if (!itemToRemove) {
      console.error("Item not found in cart");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/movie/cart/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itemToRemove.name,
          id: itemToRemove.id,
          price: itemToRemove.price,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item: ${res.status}`);
      }

      const data = await res.json();
      console.log("Item deleted:", data);

      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function updateCart() {
    if (!username) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/${username}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      setCart(
        Array.isArray(data.data.shoppingCart) ? data.data.shoppingCart : []
      );
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  useEffect(() => {
    setTotal(Math.max(0, subtotal + 5 - discount));
  }, [subtotal, discount, setTotal]);

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    const coupon = coupons.find(
      (c) => c.code === couponCode.trim().toUpperCase()
    );
    if (coupon) {
      setDiscount(coupon.discount);
      setAppliedCoupon(coupon.code);
      alert(`Coupon "${coupon.code}" applied!`);
    } else {
      alert("Invalid coupon code.");
    }
  };

  const coupons = [
    { code: "SAVE10", discount: 10 },
    { code: "SAVE20", discount: 20 },
    { code: "FREESHIP", discount: 5 },
  ];

  return (
    <div className={styles.cart}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <CartItem
                      key={product.id}
                      product={product}
                      removeItem={removeItem}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No items in the cart.
                    </td>
                  </tr>
                )}
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

              <button className={styles.updateButton} onClick={updateCart}>
                Update Cart
              </button>
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
        </>
      )}
    </div>
  );
};

export default Cart;
