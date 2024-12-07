import React, { useState, useEffect } from "react";
import styles from "./CheckoutPage.module.css";
import OrderSuccessIcon from "../../assets/order-success-icon.png";
import { useUser } from "../../contexts/userContext.tsx";
import { useCart } from "../../contexts/cartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API_URL = "https://backend-movie-app-0pio.onrender.com";

interface Product {
  name: string;
  id: string;
  price: string;
  _id: string;
}
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
  const { total } = useCart();
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
    }
  };

  const handleInputChange = () => {
    if (isSameAsBilling) {
      setShippingAddress(billingDetails);
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [showQrPopup, setShowQrPopup] = useState(false);

  const handleShowQrPopup = () => {
    setShowQrPopup(true);
  };

  const handleCloseQrPopup = () => {
    setShowQrPopup(false);
  };

  const [cart, setCart] = useState<Product[]>([]);
  const { username } = useUser() || {};
  const { discount, appliedCoupon } = useCart();

  useEffect(() => {
    async function fetchCart() {
      if (!username) return;
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
      }
    }

    fetchCart();
  }, [username]);

  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const handlePlaceOrder = async () => {
    const isBillingComplete = Object.values(billingDetails).every(
      (value) => value.trim() !== ""
    );
    console.log("Billing Details Complete:", isBillingComplete);

    console.log(shippingAddress);
    const isShippingComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );
    console.log("Shipping Address Complete:", isShippingComplete);

    const isPaymentSelected =
      document.querySelector('input[name="payment"]:checked') !== null;
    console.log("Payment Option Selected:", isPaymentSelected);

    if (!isBillingComplete || !isShippingComplete || !isPaymentSelected) {
      alert("Please fill in all the required fields before placing the order.");
      return;
    }

    console.log(total);
    const order = {
      id: "0",
      total: total.toString(),
      date: new Date().toISOString(),
      products: cart.map((item) => ({
        name: item.name,
        id: item.id.toString(),
        price: item.price.toString(),
      })),
    };

    try {
      // Đặt hàng
      const response = await fetch(
        `https://backend-movie-app-0pio.onrender.com/order/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);

      cart.map(async (item) => {
        const res = await fetch(`${API_URL}/movie/cart/${username}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: item._id,
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to delete item: ${res.status}`);
        }

        const data = await res.json();
        console.log("Item deleted:", data);
        return item._id;
      });

      setCart([]);

      setShowPopup(true);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/movies");
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.section}>
        <h2>BILLING DETAILS</h2>
        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Your first name..."
            value={billingDetails.firstName}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({
                ...billingDetails,
                firstName: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="Your last name..."
            value={billingDetails.lastName}
            onChange={(e) => {
              handleInputChange();

              setBillingDetails({
                ...billingDetails,
                lastName: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="Company..."
            value={billingDetails.company}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, company: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Your e-mail..."
            value={billingDetails.email}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Country..."
            value={billingDetails.country}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, country: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Your phone..."
            value={billingDetails.phone}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Street address..."
            value={billingDetails.streetAddress}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({
                ...billingDetails,
                streetAddress: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit etc..."
            value={billingDetails.apartment}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({
                ...billingDetails,
                apartment: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="City..."
            value={billingDetails.city}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, city: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="State..."
            value={billingDetails.state}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({ ...billingDetails, state: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Postcode..."
            value={billingDetails.postcode}
            onChange={(e) => {
              handleInputChange();
              setBillingDetails({
                ...billingDetails,
                postcode: e.target.value,
              });
            }}
          />
        </div>
      </div>

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
            type="email"
            placeholder="Your e-mail..."
            value={shippingAddress.email}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                email: e.target.value,
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
            placeholder="Your phone..."
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                phone: e.target.value,
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
          <colgroup>
            <col style={{ width: "85%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Product</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>
                  {
                    <Link
                      to={`/movies/${product.id}`}
                      className={styles.productLink}
                    >
                      {product.name}
                    </Link>
                  }
                </td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: "bold" }}>Subtotal</td>
              <td style={{ fontWeight: "bold" }}>${subtotal!.toFixed(2)}</td>
            </tr>
            {appliedCoupon && (
              <tr>
                <td style={{ fontWeight: "bold" }}>
                  Discount ({appliedCoupon}):
                </td>
                <td style={{ fontWeight: "bold" }}>-${discount.toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td style={{ fontWeight: "bold" }}>Shipping</td>
              <td style={{ fontWeight: "bold" }}>$5.00</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>Total</td>
              <td style={{ fontWeight: "bold" }}>${total!.toFixed(2)}</td>
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
              <span className={styles.paymentLabel}>
                COD (Cash on Delivery)
              </span>
            </label>
            <p className={styles.paymentDescription}>
              Pay directly when the product is delivered.
            </p>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                className={styles.radioInput}
              />
              <span className={styles.paymentLabel}>Banking Transfer</span>
            </label>
            <p
              className={styles.qrDescription}
              onClick={handleShowQrPopup}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Click here to get the QR code.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.placeOrderButtonSection}>
        <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
          Place an order
        </button>
      </div>
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupIcon}>
              <img src={OrderSuccessIcon} alt="Order Success" />
            </div>
            <div className={styles.popupHeader}>
              <h3>Thank you for ordering!</h3>
            </div>
            <div className={styles.popupBody}>
              <p>Your order has been successfully placed!</p>
              <p>You will shortly receive a confirmation email.</p>
            </div>
            <div className={styles.popupFooter}>
              <button
                className={styles.continueShoppingButton}
                onClick={handleContinue}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {showQrPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h3>Scan this QR Code</h3>
            </div>
            <div className={styles.popupBody}>
              <img
                src={`https://img.vietqr.io/image/vcb-paymentformoviebox-compact2.jpg?amount=${
                  total * 25417
                }&addInfo=test&accountName=Movie%20Box  %20
`}
                alt="QR Code"
                className={styles.qrImage}
              />
            </div>
            <div className={styles.popupFooter}>
              <button
                className={styles.continueShoppingButton}
                onClick={handleCloseQrPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
