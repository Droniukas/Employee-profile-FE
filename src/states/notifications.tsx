import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../models/Notification.interface';

const initStateValue: Notification[] = [];

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { value: initStateValue },
  reducers: {
    setNotifications: (state, action) => {
      state.value = action.payload;
    },
    setReadById: (state, action: { payload: number }) => {
      state.value.forEach((notification) => {
        if (notification.id === action.payload) {
          notification.read = true;
        }
      });
    },
    removeByProjectId: (state, action: { payload: number }) => {
      state.value = state.value.filter((notification) => {
        return notification.project.id !== action.payload;
      });
    },
    setReadByEmployeeId: (state, action: { payload: number }) => {
      state.value.forEach((notification) => {
        if (notification.employeeId === action.payload) {
          notification.read = true;
        }
      });
    },
  },
});

export const { setNotifications, setReadById, removeByProjectId, setReadByEmployeeId } = notificationsSlice.actions;

export default notificationsSlice.reducer;
