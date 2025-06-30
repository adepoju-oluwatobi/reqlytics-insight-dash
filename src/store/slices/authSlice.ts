
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  apiKey: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  apiKey: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ isAuthenticated: boolean; apiKey: string; token: string }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.apiKey = action.payload.apiKey;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.apiKey = '';
      state.token = '';
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
