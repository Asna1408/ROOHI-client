import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialStateType = {
    currentAdmin: string | null;
    error: null | string;
    loading: boolean;

};

const initialState: InitialStateType = {
    currentAdmin: null,
    error: null,
    loading: false,
   
};

const AdminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<string>) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    signoutSuccess: (state) => {
      state.currentAdmin = null;
      state.error = null;
      state.loading = false;
      
    }
  }
});

export const { signInSuccess, signoutSuccess } = AdminSlice.actions;

export default AdminSlice.reducer;