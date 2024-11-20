import React from "react";
import styles from "./CheckoutPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
interface BillingDetails {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postcode: string;
}

const Checkout: React.FC = () => {
  const [query] = useSearchParams();
  const total = +query.get("total")!;
  console.log(total);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    country: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
  });

  const [shippingAddress, setShippingAddress] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    country: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
  });

  const [isSameAsBilling, setIsSameAsBilling] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSameAsBilling(isChecked);

    if (isChecked) {
      setShippingAddress(billingDetails);
    } else {
      setShippingAddress({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        country: "",
        phone: "",
        streetAddress: "",
        apartment: "",
        city: "",
        state: "",
        postcode: "",
      });
    }
  };
  return (
    <div className={styles.checkoutContainer}>
      {/* Billing Details Section */}
      <div className={styles.section}>
        <h2>BILLING DETAILS</h2>
        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Your first name..."
            value={billingDetails.firstName}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Your last name..."
            value={billingDetails.lastName}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company..."
            value={billingDetails.company}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, company: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Your e-mail..."
            value={billingDetails.email}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Country..."
            value={billingDetails.country}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, country: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Your phone..."
            value={billingDetails.phone}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Street address..."
            value={billingDetails.streetAddress}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                streetAddress: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit etc..."
            value={billingDetails.apartment}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                apartment: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="City..."
            value={billingDetails.city}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State..."
            value={billingDetails.state}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Postcode..."
            value={billingDetails.postcode}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, postcode: e.target.value })
            }
          />
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className={styles.section}>
        <h2>SHIP TO DIFFERENT ADDRESS</h2>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isSameAsBilling}
            onChange={handleCheckboxChange}
          />
          Use Billing Details as Shipping Address
        </label>
        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Your first name..."
            value={shippingAddress.firstName}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Your last name..."
            value={shippingAddress.lastName}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                lastName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Company..."
            value={shippingAddress.company}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                company: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Country..."
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Street address..."
            value={shippingAddress.streetAddress}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                streetAddress: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit etc..."
            value={shippingAddress.apartment}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                apartment: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="City..."
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State..."
            value={shippingAddress.state}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Postcode..."
            value={shippingAddress.postcode}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postcode: e.target.value,
              })
            }
          />
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
              <td>$5.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>${total!.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2>PAYMENT METHOD</h2>
        <div className={styles.paymentSection}>
          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>COD</span>
              <p className={styles.paymentDescription}></p>
            </label>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>Banking</span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.placeOrderButtonSection}>
        <button className={styles.placeOrderButton}>Place an order</button>
      </div>
    </div>
  );
};

export default Checkout;
