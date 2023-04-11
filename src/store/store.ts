import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from '../features/loading';
import onCancelReducer from '../features/onCancel';
import skillNamesReducer from '../features/savedSkills';
import viewStateReducer from '../features/viewState';

const store = configureStore({
  reducer: {
    savedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
    onCancel: onCancelReducer,
  },
});

export default store;
