import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import booksApi from './features/books/booksApi'
import ordersApi from './orders/ordersApi'


export default configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]  : ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware , ordersApi.middleware),
})