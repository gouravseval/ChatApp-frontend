import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AuthState {
    user: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
};



export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: any, { rejectWithValue }) => {
        if(data.password !== data.confirmPassword){
            toast.error("Password and Confirm password not matched")
            return null
        } 
        try {
            const response = await axios.post("/api/v1/auth/register", {
                username: data.username,
                email: data.email,
                password: data.password
            });

            toast.success("User signed up successfully");
            return response.data;
        } catch (error: any) {
            toast.error("Something went wrong");
            return rejectWithValue(error.response?.data || 'Something went wrong while signing up');
        }
    }
);




// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/login", {
                email: data.email,
                password: data.password,
            });
            sessionStorage.setItem("userData" , JSON.stringify(response))
            toast.success("User logged in successfully");
            return response.data;
        } catch (error: any) {
            toast.error("Invalid credentials");
            return rejectWithValue(error.response?.data || 'Something went wrong while logging in');
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logout',
    async ( _ , {rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/logout");
            sessionStorage.clear()
            toast.success("User logged out");
            window.location.reload()
            return response.data;
        } catch (error: any) {
            toast.error("Unable to logout");
            return rejectWithValue(error.response?.data || 'Something went wrong while logging in');
        }
    }
);


// Create the slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            }) .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

// Export the actions and reducer
export default authSlice.reducer;
