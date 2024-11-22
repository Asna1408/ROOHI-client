
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    currentUser: { _id: string; name: string; email: string;phone:number } | null;
    error: null | string;
    loading: boolean;

};

const initialState: InitialStateType = {
    currentUser: null,
    error: null,
    loading: false,
   
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state: any) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state: any, action: PayloadAction<{_id: string; name: string; email: string; phone:number }>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state: any, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
       
        signoutSuccess: (state: any) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { signInSuccess, signInStart, signInFailure, signoutSuccess } = userSlice.actions;
export const selectUser = (state: { auth: { currentUser: any; }; })=> state.auth.currentUser
export default userSlice.reducer; 