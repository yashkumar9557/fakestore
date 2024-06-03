// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: '',
    message: '',
    description: '',
  },
  reducers: {
    SHOW_NOTIFICATION: (state, action) => {
      const { type, message, description } = action.payload;
      state.type = type;
      state.message = message;
      state.description = description;
    },
    HIDE_NOTIFICATION: (state) => {
      state.type = '';
      state.message = '';
      state.description = '';
    },
  },
});

export const { SHOW_NOTIFICATION, HIDE_NOTIFICATION } = notificationSlice.actions;
export default notificationSlice.reducer;
