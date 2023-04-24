import { createSlice } from '@reduxjs/toolkit';

import { ChangedAchievement } from '../models/ChangedAchievement.interface';

const initStateValue: ChangedAchievement[] = [];

export const changedAchievementsSlice = createSlice({
  name: 'changedAchievements',
  initialState: { value: initStateValue },
  reducers: {
    setChangedAchievements: (state, action) => {
      state.value = action.payload;
    },
    updateChangedAchievement: (state, action) => {
      state.value = [
        ...state.value.filter((item) => item.achievementId !== action.payload.achievementId),
        action.payload,
      ];
    },
  },
});

export const { setChangedAchievements, updateChangedAchievement } = changedAchievementsSlice.actions;

export default changedAchievementsSlice.reducer;
