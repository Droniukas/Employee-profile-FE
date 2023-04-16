import { configureStore } from '@reduxjs/toolkit';

import viewAchievementsStateReducer from '../state/achievementsTabState';
import achievementNamesReducer from '../state/changedAchievements';
import skillNamesReducer from '../state/changedSkills';
import loadingReducer from '../state/loading';
import onCancelReducer from '../state/onCancel';
import viewSkillsStateReducer from '../state/skillsTabState';

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
