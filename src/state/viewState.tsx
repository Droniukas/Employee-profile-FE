import { createSlice } from '@reduxjs/toolkit';

import { ViewState } from '../components/skillsTab/models/enums/ViewState';

const initStateValue: ViewState = ViewState.VIEW_STATE;

export const viewStateSlice = createSlice({
  name: 'viewState',
  initialState: { value: initStateValue },
  reducers: {
    setViewState: (state: { value: ViewState }, _action) => {
      state.value === ViewState.VIEW_STATE
        ? (state.value = ViewState.EDIT_STATE)
        : (state.value = ViewState.VIEW_STATE);
    },
  },
});

export const { setViewState } = viewStateSlice.actions;

export default viewStateSlice.reducer;
