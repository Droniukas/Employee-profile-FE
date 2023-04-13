import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from '../state/loading';
import skillNamesReducer from '../state/changedSkills';
import viewStateReducer from '../state/viewState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
  },
});

export default store;
