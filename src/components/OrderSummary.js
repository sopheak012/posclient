import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { socket } from "../socket/SocketConnection";
import { resetPizzas, removePizza } from "../features/pizzaSlice";
import { resetDrinks, deleteDrink } from "../features/drinkSlice";
import styles from "../css/OrderSummary.module.css";

const OrderSummary = () => {
  const pizzas = useSelector((state) => state.pizza);
  const drinks = useSelector((state) => state.drink);
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    updateSubtotal();
  }, [pizzas, drinks]);

  const handleSubmitOrder = async () => {
    const orderData = {
      pizzas: pizzas.map((pizza) => ({
        toppings: pizza.toppings,
        price: pizza.price,
      })),
      drinks: drinks.map((drink) => ({
        name: drink.name,
        price: drink.price,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order submitted successfully:", response.data);

      socket.emit("orderSubmitted", response.data);

      // Reset the Redux state
      dispatch(resetPizzas());
      dispatch(resetDrinks());

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error scenarios or display an error message to the user
    }
  };

  const handleResetOrder = () => {
    setSubmitted(false);
    dispatch(resetPizzas());
    dispatch(resetDrinks());
  };

  const handleRemovePizza = (id) => {
    dispatch(removePizza(id));
    updateSubtotal();
  };

  const handleRemoveDrink = (id) => {
    dispatch(deleteDrink(id));
    updateSubtotal();
  };

  const updateSubtotal = () => {
    const newSubtotal =
      pizzas.reduce((acc, pizza) => acc + (pizza.price || 0), 0) +
      drinks.reduce((acc, drink) => acc + (drink.price || 0), 0);
    setSubtotal(newSubtotal);
  };

  if (submitted) {
    return (
      <div className={styles.orderSubmitted}>
        <h2>Order Submitted</h2>
        <p>Thank you for your order!</p>
        <button onClick={handleResetOrder}>Place Another Order</button>
      </div>
    );
  }

  return (
    <div className={styles.orderSummaryContainer}>
      <h2>Order Summary</h2>
      <div className={styles.orderSummaryContent}>
        <div className={styles.selectedItems}>
          <p>Items:</p>
          {pizzas.length > 0 ? (
            <ul>
              {pizzas.map((pizza) => (
                <li key={pizza.id}>
                  <div className={styles.orderItem}>
                    <div className={styles.itemName}>
                      {pizza.toppings.join(", ")}
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.price}>
                        {pizza.price ? `$${pizza.price.toFixed(2)}` : "N/A"}
                      </div>
                      <div
                        className={styles.deleteIcon}
                        onClick={() => handleRemovePizza(pizza.id)}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pizzas in the order</p>
          )}
          {drinks.length > 0 ? (
            <ul>
              {drinks.map((drink) => (
                <li key={drink.id}>
                  <div className={styles.orderItem}>
                    <div className={styles.itemName}>{drink.name}</div>
                    <div className={styles.itemDetails}>
                      <div className={styles.price}>
                        ${drink.price.toFixed(2)}
                      </div>
                      <div
                        className={styles.deleteIcon}
                        onClick={() => handleRemoveDrink(drink.id)}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No drinks in the order</p>
          )}
        </div>
      </div>
      <div className={styles.subtotal}>
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <button
        className={styles.submitButton}
        onClick={handleSubmitOrder}
        disabled={pizzas.length === 0}
      >
        Submit Order
      </button>
    </div>
  );
};

export default OrderSummary;
