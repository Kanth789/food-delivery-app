import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("cant remove the item ");
      }
      state.items = newCart;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCart, removeFromCart, emptyCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>{
 return state.cart.items.filter((item) => item.id === id)
};

export const selectCartTotal = (state)=>state.cart.items.reduce((prev,item)=> prev = prev + item.price, 0 )
export default cartSlice.reducer;
