import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from '../features/loading';
import skillNamesReducer from '../features/changedSkills';
import viewStateReducer from '../features/viewState';

const store = configureStore({
  reducer: {
    changedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
  },
});

export default store;
