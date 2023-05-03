import { createSlice } from '@reduxjs/toolkit';

const initStateValue = true;

export const expandedAchievementSlice = createSlice({
  name: 'expandedAchievement',
  initialState: { value: initStateValue },
  reducers: {
    setExpandedAchievement: (state: { value: boolean }) => {
      state.value = !state.value;
    },
  },
});

export const { setExpandedAchievement } = expandedAchievementSlice.actions;

export default expandedAchievementSlice.reducer;
