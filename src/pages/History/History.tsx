import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext.tsx";
const API_URL = "https://backend-movie-app-0pio.onrender.com";
interface Product {
  name: string;
  id: string;
  price: string;
}

interface Order {
  id: string;
  _id: string;
  total: string;
  products: Product[];
  date: string;
}

const History: React.FC = () => {
  const { username } = useUser() || {};
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrder() {
      if (!username) return;
      try {
        const res = await fetch(`${API_URL}/order/${username}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }

    fetchOrder();
  }, [username]);
  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyTitle}>
        <h1>Order History</h1>
      </div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.orderSection}>
            <h2>Order Date: {new Date(order.date).toLocaleDateString()}</h2>
            <table className={styles.orderTable}>
              <colgroup>
                <col style={{ width: "85%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Link
                        to={`/movies/${product.id}`}
                        className={styles.productLink}
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: "bold" }}>Total</td>
                  <td style={{ fontWeight: "bold" }}>
                    ${parseFloat(order.total).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
