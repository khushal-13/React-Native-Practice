import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartSlice";
import productReducer from "./features/ProductSlice";

export default store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer
    }
})

