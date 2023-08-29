import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../features/pizzaSlice";
import styles from "../css/CreatePizza.module.css"; // Import the CSS module

const CreatePizza = () => {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const dispatch = useDispatch();

  const handleToppingSelection = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const generateId = () => {
    // Generate a unique ID for the pizza
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (selectedToppings) => {
    if (selectedToppings.length === 0) {
      // Don't add the pizza if no toppings are selected
      return;
    }

    const pizza = {
      id: generateId(),
      toppings: selectedToppings,
    };

    dispatch(addPizza(pizza));
    setSelectedToppings([]);
  };

  return (
    <div className={styles.create_pizza_container}>
      <h2>Create Pizza</h2>
      <div className={styles.toppings_container}>
        <button
          onClick={() => handleToppingSelection("Pepperoni")}
          className={
            selectedToppings.includes("Pepperoni") ? styles.active : ""
          }
        >
          Pepperoni
        </button>
        <button
          onClick={() => handleToppingSelection("Sausage")}
          className={selectedToppings.includes("Sausage") ? styles.active : ""}
        >
          Sausage
        </button>
        <button
          onClick={() => handleToppingSelection("Pineapple")}
          className={
            selectedToppings.includes("Pineapple") ? styles.active : ""
          }
        >
          Pineapple
        </button>
        <button
          onClick={() => handleToppingSelection("Mushroom")}
          className={selectedToppings.includes("Mushroom") ? styles.active : ""}
        >
          Mushroom
        </button>
        <button
          onClick={() => handleToppingSelection("Bacon")}
          className={selectedToppings.includes("Bacon") ? styles.active : ""}
        >
          Bacon
        </button>
        {/* Add more buttons for other toppings */}
      </div>
      <div className={styles.selected_toppings_container}>
        <p>Selected Toppings: {selectedToppings.join(", ")}</p>
        <button
          onClick={() => handleSubmit(selectedToppings)}
          className={styles.primary_button}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default CreatePizza;
