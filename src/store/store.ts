import { configureStore } from '@reduxjs/toolkit';

import skillNamesReducer from '../state/changedSkills';
import onCancelReducer from '../state/onCancel';
import viewStateReducer from '../state/skillsTabState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    onCancel: onCancelReducer,
  },
});

export default store;
