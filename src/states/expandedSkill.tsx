import { createSlice } from '@reduxjs/toolkit';

const initStateValue = true;

export const expandedSkillSlice = createSlice({
  name: 'expandedSkill',
  initialState: { value: initStateValue },
  reducers: {
    setExpandedSkill: (state: { value: boolean }) => {
      state.value = !state.value;
    },
  },
});

export const { setExpandedSkill } = expandedSkillSlice.actions;

export default expandedSkillSlice.reducer;
