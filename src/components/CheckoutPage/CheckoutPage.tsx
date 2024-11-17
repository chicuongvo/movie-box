import React from "react";
import styles from "./CheckoutPage.module.css";
import { useSearchParams } from "react-router-dom";

const Checkout: React.FC = () => {
  const [query] = useSearchParams();
  const total = +query.get("total")!;
  console.log(total);
  return (
    <div className={styles.checkoutContainer}>
      {/* Returning Customer Section */}
      <div className={styles.infoSection}>
        <h2>RETURNING CUSTOMER?</h2>
        <a href="#" className={styles.link}>
          Click here to login
        </a>
      </div>

      {/* Coupon Section */}
      <div className={styles.infoSection}>
        <h2>HAVE A COUPON?</h2>
        <a href="#" className={styles.link}>
          Click here to enter your code
        </a>
      </div>

      {/* Billing Details Section */}
      <div className={styles.section}>
        <h2>BILLING DETAILS</h2>
        <div className={styles.formGrid}>
          <input type="text" placeholder="Your first name..." />
          <input type="text" placeholder="Your last name..." />
          <input type="text" placeholder="Company..." />
          <input type="email" placeholder="Your e-mail..." />
          <input type="text" placeholder="Country..." />
          <input type="text" placeholder="Your phone..." />
          <input type="text" placeholder="Street address..." />
          <input type="text" placeholder="Apartment, suite, unit etc..." />
          <input type="text" placeholder="City..." />
          <input type="text" placeholder="State..." />
          <input type="text" placeholder="Postcode..." />
        </div>
        <label>
          <input type="checkbox" />
          Create an account
        </label>
      </div>

      {/* Shipping Address Section */}
      <div className={styles.section}>
        <h2>SHIP TO DIFFERENT ADDRESS</h2>
        <div className={styles.formGrid}>
          <input type="text" placeholder="Your first name..." />
          <input type="text" placeholder="Your last name..." />
          <input type="text" placeholder="Company..." />
          <input type="text" placeholder="Country..." />
          <input type="text" placeholder="Street address..." />
          <input type="text" placeholder="Apartment, suite, unit etc..." />
          <input type="text" placeholder="City..." />
          <input type="text" placeholder="State..." />
          <input type="text" placeholder="Postcode..." />
          <textarea placeholder="Order notes..."></textarea>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className={styles.section}>
        <h2>YOUR ORDER</h2>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${total!.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>
                Please fill in your details to see available shipping methods.
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>${total!.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Method Section */}
      <div className={styles.checkoutContainer}>
        {/* Payment Method Section */}
        <div className={styles.section}>
          <h2>PAYMENT METHOD</h2>
          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>Cheque Payment</span>
              <p className={styles.paymentDescription}>
                Please send your cheque to Store Name, Store Street, Store Town,
                Store State / County, Store Postcode.
              </p>
            </label>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>PayPal</span>
              <a href="#" className={styles.paypalInfo}>
                What is PayPal?
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
