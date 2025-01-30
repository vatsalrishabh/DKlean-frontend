// src/features/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceId: null,
  name: '',
  price: '',
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServiceData: (state, action) => {
      state.serviceId = action.payload.serviceId;
      state.name = action.payload.name;
      state.price = action.payload.price;
    },
    resetServiceData: (state) => {
      state.serviceId = null;
      state.name = '';
      state.price = '';
    },
  },
});

// Named export for setServiceData
export const { setServiceData } = serviceSlice.actions;

export default serviceSlice.reducer;
