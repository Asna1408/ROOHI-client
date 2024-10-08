// src/store/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  selectedDate: string | null;
}

const initialState: BookingState = {
  selectedDate: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    clearSelectedDate(state) {
      state.selectedDate = null;
    },
  },
});

export const { setSelectedDate, clearSelectedDate } = bookingSlice.actions;
export default bookingSlice.reducer;
