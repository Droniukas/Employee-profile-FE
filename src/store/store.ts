import { configureStore } from '@reduxjs/toolkit';

import skillNamesReducer from '../states/changedSkills';
import expandedReducer from '../states/expanded';
import onCancelReducer from '../states/onCancel';
import viewStateReducer from '../states/skillsTabState';
import skillWithErrorIdReducer from '../states/skillWithErrorId';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    onCancel: onCancelReducer,
    expanded: expandedReducer,
    skillWithErrorId: skillWithErrorIdReducer,
  },
});

export default store;
