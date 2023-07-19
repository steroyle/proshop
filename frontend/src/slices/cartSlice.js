import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils'

const initialState =
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // the item we want to add to cart
      const item = action.payload;

      // Check if this item already exists in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id );

      if (existItem) {
        state.cartItems = state.cartItems.map(
          (currentItem) => currentItem._id === existItem._id
            ? { ...currentItem, qty: currentItem.qty + item.qty }
            : currentItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    }
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;