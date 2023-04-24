import { configureStore } from '@reduxjs/toolkit';

import viewAchievementsStateReducer from '../states/achievementsTabState';
import achievementNamesReducer from '../states/changedAchievements';
import skillNamesReducer from '../states/changedSkills';
import expandedReducer from '../states/expanded';
import onCancelReducer from '../states/onCancel';
import viewSkillsStateReducer from '../states/skillsTabState';
import skillWithErrorIdReducer from '../states/skillWithErrorId';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    changedAchievements: achievementNamesReducer,
    viewSkillsState: viewSkillsStateReducer,
    viewAchievementsState: viewAchievementsStateReducer,
    onCancel: onCancelReducer,
    expanded: expandedReducer,
    skillWithErrorId: skillWithErrorIdReducer,
  },
});

export default store;
