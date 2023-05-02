import { createSlice } from '@reduxjs/toolkit';

import { ChangedSkill } from '../models/ChangedSkill.interface';

const initStateValue: ChangedSkill[] = [];

export const changedSkillsSlice = createSlice({
  name: 'changedSkills',
  initialState: { value: initStateValue },
  reducers: {
    setChangedSkills: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    updateChangedSkill: (state, action) => {
      state.value = [...state.value.filter((item) => item.skillId !== action.payload.skillId), action.payload];
      console.log(state.value);
    },
  },
});

export const { setChangedSkills, updateChangedSkill } = changedSkillsSlice.actions;

export default changedSkillsSlice.reducer;
