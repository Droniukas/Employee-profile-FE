import { configureStore } from '@reduxjs/toolkit'

import skillNamesReducer from '../features/savedSkills'
import viewStateReducer from '../features/viewState'
import onCancelReducer from '../features/onCancel'
import loadingReducer from '../features/loading'

const store = configureStore({
  reducer: {
    savedSkills: skillNamesReducer,
    viewState: viewStateReducer,
    loading: loadingReducer,
    onCancel: onCancelReducer,
  },
})

export default store
