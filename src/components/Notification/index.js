// Notification.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { HIDE_NOTIFICATION } from '../../redux/reducers/notification';

const Notification = () => {
  const dispatch = useDispatch();
  const { type, message, description } = useSelector((state) => state.notification);
  useEffect(() => {
    if (message) {
      notification[type]({
        message,
        description,
        duration: 1,
      });
      dispatch(HIDE_NOTIFICATION());
    }
  }, [type, message, description, dispatch]);

  return null;
};

export default Notification;
