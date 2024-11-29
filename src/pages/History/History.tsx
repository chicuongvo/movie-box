import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  id: string;
  price: string;
}

interface Order {
  _id: string;
  total: string;
  products: Product[];
  date: string;
}

const History: React.FC = () => {
  // Dữ liệu set cứng (mock data)
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: "order1",
      total: "99.99",
      date: "2024-11-25T12:00:00Z",
      products: [
        { name: "Movie 1", id: "1", price: "29.99" },
        { name: "Movie 2", id: "2", price: "39.99" },
        { name: "Movie 3", id: "3", price: "29.99" },
      ],
    },
    {
      _id: "order2",
      total: "59.99",
      date: "2024-11-23T15:00:00Z",
      products: [
        { name: "Movie 4", id: "4", price: "29.99" },
        { name: "Movie 5", id: "5", price: "30.00" },
      ],
    },
    {
      _id: "order3",
      total: "109.99",
      date: "2024-11-21T09:30:00Z",
      products: [
        { name: "Movie 6", id: "6", price: "50.00" },
        { name: "Movie 7", id: "7", price: "59.99" },
      ],
    },
  ]);

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
