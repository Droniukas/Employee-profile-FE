import { createSlice } from '@reduxjs/toolkit';

const initStateValue = true;

export const onCancelSlice = createSlice({
  name: 'onCancel',
  initialState: { value: initStateValue },
  reducers: {
    triggerOnCancel: (state: { value: boolean }, _action) => {
      state.value = !state.value;
    },
  },
});

export const { triggerOnCancel } = onCancelSlice.actions;

export default onCancelSlice.reducer;
