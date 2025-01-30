import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../features/serviceSlice"

const store = configureStore({
    reducer:{
        service:serviceReducer,
    },
});

export default store;