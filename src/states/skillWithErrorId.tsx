import { createSlice } from '@reduxjs/toolkit';

const initStateValue = { skillId: '' };

export const skillWithErrorIdSlice = createSlice({
  name: 'skillWithErrorId',
  initialState: { value: initStateValue },
  reducers: {
    setSkillWithErrorId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSkillWithErrorId } = skillWithErrorIdSlice.actions;

export default skillWithErrorIdSlice.reducer;
