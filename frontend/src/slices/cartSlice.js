import { createSlice } from '@reduxjs/toolkit';

const initialState =
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}

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

      // Calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => (acc + item.price) * item.qty, 0));

      // Calculate shipping price (If order is over £100 then free, else £10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice >= 100 ? 0 : 10);

      // Calculate tax price (15%)
      state.taxPrice = addDecimals((Number(state.itemsPrice) + Number(state.shippingPrice)) * 0.15);

      // Calculate total price
      state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));

      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;