import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../features/pizzaSlice";

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
    <div className="create-pizza-container">
      <h2>Create Pizza</h2>
      <div className="toppings-container">
        <button
          onClick={() => handleToppingSelection("Pepperoni")}
          className={selectedToppings.includes("Pepperoni") ? "active" : ""}
        >
          Pepperoni
        </button>
        <button
          onClick={() => handleToppingSelection("Sausage")}
          className={selectedToppings.includes("Sausage") ? "active" : ""}
        >
          Sausage
        </button>
        <button
          onClick={() => handleToppingSelection("Pineapple")}
          className={selectedToppings.includes("Pineapple") ? "active" : ""}
        >
          Pineapple
        </button>
        {/* Add more buttons for other toppings */}
      </div>
      <div className="selected-toppings-container">
        <p>Selected Toppings: {selectedToppings.join(", ")}</p>
        <button
          onClick={() => handleSubmit(selectedToppings)}
          className="primary-button"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default CreatePizza;
