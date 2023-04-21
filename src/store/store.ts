import { configureStore } from '@reduxjs/toolkit';

import viewAchievementsStateReducer from '../states/achievementsTabState';
import achievementNamesReducer from '../states/changedAchievements';
import skillNamesReducer from '../states/changedSkills';
import onCancelReducer from '../states/onCancel';
import viewSkillsStateReducer from '../states/skillsTabState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    changedAchievements: achievementNamesReducer,
    viewSkillsState: viewSkillsStateReducer,
    viewAchievementsState: viewAchievementsStateReducer,
    loading: loadingReducer,
    onCancel: onCancelReducer,
  },
});

export default store;
