import { configureStore } from '@reduxjs/toolkit';

import skillNamesReducer from '../state/changedSkills';
import loadingReducer from '../state/loading';
import onCancelReducer from '../state/onCancel';
import viewStateReducer from '../state/skillsTabState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
    onCancel: onCancelReducer,
  },
});

export default store;
