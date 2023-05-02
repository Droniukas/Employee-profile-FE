import { configureStore } from '@reduxjs/toolkit';

import viewAchievementsStateReducer from '../states/achievementsTabState';
import achievementWithErrorIdReducer from '../states/achievementWithErrorId';
import achievementNamesReducer from '../states/changedAchievements';
import skillNamesReducer from '../states/changedSkills';
import expandedAchievementReducer from '../states/expandedAchievement';
import expandedSkillReducer from '../states/expandedSkill';
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
    expandedSkill: expandedSkillReducer,
    expandedAchievement: expandedAchievementReducer,
    skillWithErrorId: skillWithErrorIdReducer,
    achievementWithErrorId: achievementWithErrorIdReducer,
  },
});

export default store;
