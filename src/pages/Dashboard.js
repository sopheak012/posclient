import React, { useEffect, useState } from "react";
import { socket } from "../socket/SocketConnection";
import axios from "axios";
import styles from "../css/Dashboard.module.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchOrders();

    socket.emit("joinRoom", userInfo.username);
    socket.on("orderUpdated", () => {
      console.log("Received orderUpdated event:");
      fetchOrders();
    });

    return () => {
      socket.off("orderUpdated", handleOrderUpdated);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const token = userInfo.token;
      const username = userInfo.username;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          username: username,
        },
      };
      const response = await axios.get(
        "https://pos-api-2ta4.onrender.com/api/orders",
        config
      );
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleOrderUpdated = (updatedOrder) => {
    setOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex(
        (order) => order._id === updatedOrder._id
      );

      if (orderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex] = updatedOrder;
        return updatedOrders;
      } else {
        return [updatedOrder, ...prevOrders];
      }
    });
  };

  const sortedOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Order List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : sortedOrders.length > 0 ? (
        <ul className={styles.orderList}>
          {sortedOrders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <div className={styles.orderId}>Order ID: {order.orderNum}</div>
              <div className={styles.orderTime}>
                Placed at: {formatTime(order.createdAt)}
              </div>
              <div className={styles.pizzas}>
                <div>Pizzas:</div>
                {order.pizzas
                  .reduce((acc, pizza) => {
                    const existingPizza = acc.find(
                      (item) =>
                        item.toppings.join(", ") === pizza.toppings.join(", ")
                    );
                    if (existingPizza) {
                      existingPizza.quantity += 1;
                    } else {
                      acc.push({ ...pizza, quantity: 1 });
                    }
                    return acc;
                  }, [])
                  .map((pizza, index) => (
                    <div key={index} className={styles.pizzaItem}>
                      {pizza.quantity}x {pizza.toppings.join(", ")}
                    </div>
                  ))}
              </div>
              <div className={styles.drinks}>
                <div>Drinks:</div>
                {order.drinks
                  .reduce((acc, drink) => {
                    const existingDrink = acc.find(
                      (item) => item.name === drink.name
                    );
                    if (existingDrink) {
                      existingDrink.quantity += 1;
                    } else {
                      acc.push({ ...drink, quantity: 1 });
                    }
                    return acc;
                  }, [])
                  .map((drink, index) => (
                    <div key={index} className={styles.drinkItem}>
                      {drink.quantity}x {drink.name}
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Dashboard;
