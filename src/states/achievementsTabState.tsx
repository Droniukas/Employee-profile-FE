import { createSlice } from '@reduxjs/toolkit';

import { AchievementsTabState } from '../components/enums/AchievementsTabState';

const initStateValue: AchievementsTabState = AchievementsTabState.VIEW_STATE;

export const achievementsTabStateSlice = createSlice({
  name: 'onCancel',
  initialState: { value: initStateValue },
  reducers: {
    setAchievementsTabState: (state: { value: AchievementsTabState }) => {
      state.value === AchievementsTabState.VIEW_STATE
        ? (state.value = AchievementsTabState.EDIT_STATE)
        : (state.value = AchievementsTabState.VIEW_STATE);
    },
  },
});

export const { setAchievementsTabState } = achievementsTabStateSlice.actions;

export default achievementsTabStateSlice.reducer;
