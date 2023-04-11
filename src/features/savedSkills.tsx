import { createSlice } from '@reduxjs/toolkit';

import { SavedSkills } from '../components/skillsTab/models/interfaces/SavedSkillData.interface';

const initStateValue: SavedSkills[] = [];

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
