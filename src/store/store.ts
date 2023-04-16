import { configureStore } from '@reduxjs/toolkit';

import skillNamesReducer from '../states/changedSkills';
import loadingReducer from '../states/loading';
import onCancelReducer from '../states/onCancel';
import viewStateReducer from '../states/skillsTabState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
    onCancel: onCancelReducer,
  },
});

export default store;
