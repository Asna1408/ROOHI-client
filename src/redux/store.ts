import { configureStore } from "@reduxjs/toolkit";
import { persistStore , persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import userReducer  from './user/UserSlice';
import adminReducer from "./admin/AdminSlice";
import bookingReducer from "./user/BookingSlice"

const persistConfig = {
    key: 'root',
    storage
}

const persistReducerUser =  persistReducer(persistConfig, userReducer);
const persistReducerAdmin = persistReducer(persistConfig,adminReducer)
const persistReducerBooking = persistReducer(persistConfig,bookingReducer);



export const store = configureStore({
    reducer: {
        user: persistReducerUser,
        admin:persistReducerAdmin,   
        booking: persistReducerBooking, 

    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);

export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;