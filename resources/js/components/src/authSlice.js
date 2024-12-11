import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;

            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('role', btoa(user.role || 'guest'));
        },
        logout: (state) => { 
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
