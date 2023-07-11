import React from "react";
import { useDispatch } from "react-redux";
import { addDrink } from "../features/drinkSlice";
import styles from "../css/CreateDrink.module.css";

const CreateDrink = () => {
  const dispatch = useDispatch();

  const handleAddDrink = (name) => {
    const newDrink = {
      id: Math.random().toString(),
      name: name,
      price: 1.25,
    };
    dispatch(addDrink(newDrink));
  };

  return (
    <div className={styles.container}>
      <h2>Create Drink</h2>

      <h3>Popular Canned Drinks</h3>
      <ul>
        <li>
          <button onClick={() => handleAddDrink("Coca-Cola")}>Coca-Cola</button>
        </li>
        <li>
          <button onClick={() => handleAddDrink("Pepsi")}>Pepsi</button>
        </li>
        <li>
          <button onClick={() => handleAddDrink("Sprite")}>Sprite</button>
        </li>
        <li>
          <button onClick={() => handleAddDrink("Dr. Pepper")}>
            Dr. Pepper
          </button>
        </li>
        <li>
          <button onClick={() => handleAddDrink("Mountain Dew")}>
            Mountain Dew
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CreateDrink;
