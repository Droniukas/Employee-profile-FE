import { createSlice } from '@reduxjs/toolkit';

import Employee from '../models/Employee.interface';

const initStateValue: Employee | null = null;

export const userStateSlice = createSlice({
  name: 'userState',
  initialState: { value: initStateValue },
  reducers: {
    setUserState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserState } = userStateSlice.actions;

export default userStateSlice.reducer;
