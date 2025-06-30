
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  currentPlan: string;
  isLoading: boolean;
}

const initialState: SubscriptionState = {
  currentPlan: 'free',
  isLoading: false,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<string>) => {
      state.currentPlan = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentPlan, setLoading } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
