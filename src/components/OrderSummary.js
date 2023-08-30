import React, { useState, useEffect, useRef } from "react";
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

  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  const orderSummaryRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component updates
    orderSummaryRef.current.scrollTop = orderSummaryRef.current.scrollHeight;
    updateSubtotal(); // Update the subtotal when pizzas or drinks change
  }, [pizzas, drinks]);

  const handleSubmitOrder = async () => {
    setLoading(true);

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
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token;
      const username = userInfo.username;
      const response = await axios.post(
        "https://pos-api-2ta4.onrender.com/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            username: username,
          },
        }
      );
      console.log("Order submitted successfully:", response.data);

      socket.emit("orderSubmitted", username);

      dispatch(resetPizzas());
      dispatch(resetDrinks());
      setSubtotal(0); // Reset subtotal after submitting the order
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePizza = (id) => {
    dispatch(removePizza(id));
  };

  const handleRemoveDrink = (id) => {
    dispatch(deleteDrink(id));
  };

  const updateSubtotal = () => {
    const newSubtotal =
      pizzas.reduce((acc, pizza) => acc + (pizza.price || 0), 0) +
      drinks.reduce((acc, drink) => acc + (drink.price || 0), 0);
    setSubtotal(newSubtotal);
  };

  return (
    <div className={styles.orderSummaryContainer} ref={orderSummaryRef}>
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
                        <FaTrash className={styles.deleteIcon} />
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
                        <FaTrash className={styles.deleteIcon} />
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
        disabled={pizzas.length === 0 || loading}
      >
        {loading ? "Submitting..." : "Submit Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
