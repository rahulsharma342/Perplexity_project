import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;        // ✅ success pe error clear
        },
        setLoading: (state, action) => {
            state.loading = action.payload;  // ✅ true ya false dono
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;        // ✅ logout pe sab reset
        },
    },
});

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;

export default authSlice.reducer;