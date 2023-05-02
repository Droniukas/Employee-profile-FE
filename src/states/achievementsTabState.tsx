import { createSlice } from '@reduxjs/toolkit';

import { AchievementsTabState } from '../components/enums/AchievementsTabState';

const initStateValue: AchievementsTabState = AchievementsTabState.VIEW_STATE;

export const achievementsTabStateSlice = createSlice({
  name: 'achievementsTabState',
  initialState: { value: initStateValue },
  reducers: {
    setAchievementsTabState: (state: { value: AchievementsTabState }, _action) => {
      state.value === AchievementsTabState.VIEW_STATE
        ? (state.value = AchievementsTabState.EDIT_STATE)
        : (state.value = AchievementsTabState.VIEW_STATE);
    },
  },
});

export const { setAchievementsTabState } = achievementsTabStateSlice.actions;

export default achievementsTabStateSlice.reducer;
