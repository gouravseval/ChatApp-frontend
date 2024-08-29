import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slice/authSlice"
import userReducer from "../slice/userDetailsSlice"

export const store = configureStore({
  reducer: {
    auth : authReducer,
    users: userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch