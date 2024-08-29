import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserState {
    users: any[];
    conversations: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    messages: any[];
    onlineUser: any[]
}

const initialState: UserState = {
    users: [],
    conversations: [],
    status: 'idle',
    error: null,
    messages: [],
    onlineUser: [],
};
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL

// Fetch users from the /users API
export const fetchUsers = createAsyncThunk('userDetails/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${base_url}/api/v1/`);
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error fetching users');
    }
});


// Fetch messages from the /messages API
export const fetchMessages = createAsyncThunk('userDetails/fetchMessages', async (receiverId: any, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${base_url}/api/v1/messages/${receiverId}`);
        return response.data.data?.messages;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error fetching messages');
    }
});

// send messages
export const sendMessage = createAsyncThunk(
    'userDetails/sendMessage',
    async ({ receiverId, message }: { receiverId: string; message: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/api/v1/messages/send/${receiverId}`, {
                message,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error sending message');
        }
    }
);

// post profile pic
export const postProfilePic = createAsyncThunk(
    'Profile/postProfilePicture',
    async (event: React.ChangeEvent<HTMLInputElement>, thunkAPI) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);
            try {
                const response = await axios.post(`${base_url}//api/v1/profilePic`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    thunkAPI.dispatch(fetchProfilPic());
                    toast.success("Profile picture updated Succesfully")
                }
            } catch (error: any) {
                toast.error("something went wrong")
                return thunkAPI.rejectWithValue(error.message);
            }
        } else {
            return thunkAPI.rejectWithValue('No file selected');
        }
    }
);



// fetchProfilPic

export const fetchProfilPic = createAsyncThunk(
    'userDetails/fetchProfilePic',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_url}/api/v1/profilePic`);
            sessionStorage.setItem("profilePic", JSON.stringify(response.data.data))
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Something went wrong while signing up');
        }
    }
);


// Fetch conversations from the /conversation API
export const fetchConversations = createAsyncThunk(`${base_url}/userDetails/fetchConversations`, async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('api/v1/messages/conversation');
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Error fetching conversations');
    }
});

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload
        },
        setMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchConversations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.conversations = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(postProfilePic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postProfilePic.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(postProfilePic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setOnlineUser, setMessage } = userDetailsSlice.actions
// Export the reducer to be used in the store
export default userDetailsSlice.reducer;
