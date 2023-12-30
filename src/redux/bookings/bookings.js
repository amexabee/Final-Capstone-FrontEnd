/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async () => {
    const response = await fetch('https://rails-i4jr.onrender.com/bookings', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
    const bookings = await response.json();
    return bookings;
  },
);
export const postBooking = createAsyncThunk(
  'bookings/postBooking',
  async (data) => {
    await fetch('https://rails-i4jr.onrender.com/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        console.log(res.json());
        return res.json();
      }
      throw new Error('something went wrong');
    });
  },
);

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookings.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
      state.status = 'success';
    });
    builder.addCase(getBookings.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(postBooking.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(postBooking.fulfilled, (state, action) => {
      console.log(action);
      state.bookings = [...state.bookings, action.payload];
      state.status = 'success';
    });
    builder.addCase(postBooking.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default bookingsSlice.reducer;
