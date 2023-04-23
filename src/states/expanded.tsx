import { createSlice } from '@reduxjs/toolkit';

const initStateValue = true;

export const expandedSlice = createSlice({
  name: 'expanded',
  initialState: { value: initStateValue },
  reducers: {
    setExpanded: (state: { value: boolean }, _action) => {
      state.value = !state.value;
    },
  },
});

export const { setExpanded } = expandedSlice.actions;

export default expandedSlice.reducer;
