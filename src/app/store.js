import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import pizzaReducer from "../features/pizzaSlice";
import drinkReducer from "../features/drinkSlice";
import userReducer from "../features/userSlice";

const logStateChanges = (store) => (next) => (action) => {
  const prevState = store.getState(); // Get the previous state before the action is dispatched
  const result = next(action); // Call the next middleware or the reducer to update the state
  const nextState = store.getState(); // Get the next state after the action is dispatched

  // Check if the pizza, drink, or user state has changed and log the changes
  if (prevState.pizza !== nextState.pizza) {
    console.log("Pizza state changed:", nextState.pizza);
  }
  if (prevState.drink !== nextState.drink) {
    console.log("Drink state changed:", nextState.drink);
  }
  if (prevState.user !== nextState.user) {
    console.log("User state changed:", nextState.user);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    drink: drinkReducer,
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware(), logStateChanges],
});
