import { createSlice } from "@reduxjs/toolkit";

const drinkSlice = createSlice({
  name: "drink",
  initialState: [],
  reducers: {
    addDrink: (state, action) => {
      const newDrink = {
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
        ...action.payload,
        price: 1.25,
      };
      state.push(newDrink);
    },
    editDrink: (state, action) => {
      const { id, updatedDrink } = action.payload;
      const drinkIndex = state.findIndex((drink) => drink.id === id);
      if (drinkIndex !== -1) {
        state[drinkIndex] = { ...state[drinkIndex], ...updatedDrink };
      }
    },
    deleteDrink: (state, action) => {
      const id = action.payload;
      const drinkIndex = state.findIndex((drink) => drink.id === id);
      if (drinkIndex !== -1) {
        state.splice(drinkIndex, 1);
      }
    },
    resetDrinks: () => {
      return [];
    },
  },
});

export const { addDrink, editDrink, deleteDrink, resetDrinks } =
  drinkSlice.actions;
export default drinkSlice.reducer;
