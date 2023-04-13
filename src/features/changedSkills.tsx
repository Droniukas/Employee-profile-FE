import { createSlice } from '@reduxjs/toolkit';

import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';

const initStateValue: ChangedSkill[] = [];

export const changedSkillsSlice = createSlice({
  name: 'changedSkills',
  initialState: { value: initStateValue },
  reducers: {
    setChangedSkills: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChangedSkills } = changedSkillsSlice.actions;

export default changedSkillsSlice.reducer;
