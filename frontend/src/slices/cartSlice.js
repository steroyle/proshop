import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils'

const initialState =
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAdress: {}, paymentMethod: 'PayPal' };

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
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;