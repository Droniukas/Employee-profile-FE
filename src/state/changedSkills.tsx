import { createSlice } from '@reduxjs/toolkit';

import { ChangedSkill } from '../models/ChangedSkill.interface';

const initStateValue: ChangedSkill[] = [];

export const changedSkillsSlice = createSlice({
  name: 'changedSkills',
  initialState: { value: initStateValue },
  reducers: {
    setChangedSkills: (state, action) => {
      state.value = action.payload;
    },
    updateChangedSkill: (state, action) => {
      state.value = [...state.value.filter((item) => item.id !== action.payload.id), action.payload];
    },
  },
});

export const { setChangedSkills, updateChangedSkill } = changedSkillsSlice.actions;

export default changedSkillsSlice.reducer;
