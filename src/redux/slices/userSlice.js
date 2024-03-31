import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(
    'user/signupuser',
    async (signUpCredentials) => {
        const result = await axios.post('http://localhost:8000/api/user/login', signUpCredentials)
        const response = await result.data;
        return response;
    }
)
export const loginUser = createAsyncThunk(
    'user.loginUser',
    async (loginCredentials) => {
        const request = await axios.post('http://localhost:8000/api/user/login', loginCredentials)
        const response = await request.data;
        localStorage.setItem('user', JSON.stringify(response))
        return response;

    }
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'true') {
                    state.user = action.payload;
                    state.error = null
                }
                else {
                    state.user = null;
                    state.error = action.payload.message;
                }
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.status === 'false') {
                    state.loading = false;
                    state.user = null;
                    state.error = action.payload.message;
                }
                else {
                    state.loading = false;
                    state.user = action.payload;
                    state.error = null;
                }

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message
            })

    }
})
export default userSlice.reducer;