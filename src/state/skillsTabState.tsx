import { createSlice } from '@reduxjs/toolkit';

import { SkillsTabState } from '../components/skillsTab/models/enums/SkillsTabState';

const initStateValue: SkillsTabState = SkillsTabState.VIEW_STATE;

export const skillsTabStateSlice = createSlice({
  name: 'onCancel',
  initialState: { value: initStateValue },
  reducers: {
    setSkillsTabState: (state: { value: SkillsTabState }, _action) => {
      state.value === SkillsTabState.VIEW_STATE
        ? (state.value = SkillsTabState.EDIT_STATE)
        : (state.value = SkillsTabState.VIEW_STATE);
    },
  },
});

export const { setSkillsTabState } = skillsTabStateSlice.actions;

export default skillsTabStateSlice.reducer;