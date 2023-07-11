import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import pizzaReducer from "../features/pizzaSlice";
import drinkReducer from "../features/drinkSlice";
import userReducer from "../features/userSlice";

// Custom middleware function to log state changes
const logStateChanges = (store) => (next) => (action) => {
  const result = next(action);
  console.log("Updated State:", store.getState());
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
