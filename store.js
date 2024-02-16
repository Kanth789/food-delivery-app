import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import restuarntSlice from './slices/restuarntSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restuarntSlice,
  },
})