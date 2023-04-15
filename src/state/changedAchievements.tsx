import { createSlice } from '@reduxjs/toolkit';

import { ChangedAchievement } from '../components/achievementsTab/models/interfaces/ChangedAchievement.interface';

const initStateValue: ChangedAchievement[] = [];

export const changedAchievementsSlice = createSlice({
  name: 'changedAchievements',
  initialState: { value: initStateValue },
  reducers: {
    setChangedAchievements: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChangedAchievements } = changedAchievementsSlice.actions;

export default changedAchievementsSlice.reducer;
