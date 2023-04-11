import { createSlice } from '@reduxjs/toolkit';

import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';

const initStateValue: ChangedSkill[] = [];

export const savedSkillsSlice = createSlice({
  name: 'savedSkills',
  initialState: { value: initStateValue },
  reducers: {
    setSavedSkills: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSavedSkills } = savedSkillsSlice.actions;

export default savedSkillsSlice.reducer;
