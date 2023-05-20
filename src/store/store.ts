import { configureStore } from '@reduxjs/toolkit';

import achievementsTabStateReducer from '../states/achievementsTabState';
import achievementWithErrorIdReducer from '../states/achievementWithErrorId';
import achievementNamesReducer from '../states/changedAchievements';
import skillNamesReducer from '../states/changedSkills';
import expandedAchievementReducer from '../states/expandedAchievement';
import expandedSkillReducer from '../states/expandedSkill';
import notificationsReducer from '../states/notifications';
import onCancelReducer from '../states/onCancel';
import skillsTabStateReducer from '../states/skillsTabState';
import skillWithErrorIdReducer from '../states/skillWithErrorId';
import userStateReducer from '../states/userState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    changedAchievements: achievementNamesReducer,
    skillsTabState: skillsTabStateReducer,
    achievementsTabState: achievementsTabStateReducer,
    onCancel: onCancelReducer,
    userState: userStateReducer,
    expandedSkill: expandedSkillReducer,
    expandedAchievement: expandedAchievementReducer,
    skillWithErrorId: skillWithErrorIdReducer,
    achievementWithErrorId: achievementWithErrorIdReducer,
    notifications: notificationsReducer,
  },
});

export default store;
