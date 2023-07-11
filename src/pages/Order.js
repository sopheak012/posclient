import React from "react";
import CreatePizza from "../components/CreatePizza";
import CreateDrink from "../components/CreateDrink";
import OrderSummary from "../components/OrderSummary";
import styles from "../css/Order.module.css";

const Order = () => {
  return (
    <div className={styles.orderContainer}>
      <h1>Order Page</h1>
      <div className={styles.orderContent}>
        <div className={styles.createPizza}>
          <CreatePizza />
        </div>
        <div className={styles.createDrink}>
          <CreateDrink />
        </div>
        <div className={styles.orderSummary}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Order;
