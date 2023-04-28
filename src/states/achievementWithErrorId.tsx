import { createSlice } from '@reduxjs/toolkit';
const initStateValue = { achievementId: '' };
export const achievementWithErrorIdSlice = createSlice({
  name: 'achievementWithErrorId',
  initialState: { value: initStateValue },
  reducers: {
    setAchievementWithErrorId: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setAchievementWithErrorId } = achievementWithErrorIdSlice.actions;
export default achievementWithErrorIdSlice.reducer;
