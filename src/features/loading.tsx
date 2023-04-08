import { createSlice } from '@reduxjs/toolkit'

const initStateValue = true

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: initStateValue },
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
