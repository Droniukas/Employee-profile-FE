import { Box, Menu, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { Notification } from '../../../models/Notification.interface';
import { notificationsRoot } from '../../../store/types/notifications';
import NotificationItem from './NotificationItem';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  notificationsCount: number;
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose, setNotificationsCount, notificationsCount } = props;
  const open = Boolean(notificationIconAnchorEl);
  const notifications = useSelector((state: notificationsRoot) => state.notifications.value);

  return (
    <>
      <Menu
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={notificationIconAnchorEl}
        open={open}
        onClose={() => {
          onClose();
        }}
      >
        <Box sx={{ mx: '15px' }}>
          <Typography sx={{ mb: '15px', fontSize: 20 }}>Notifications</Typography>
          <Typography sx={{ mb: '5px', fontSize: 12 }}>LATEST</Typography>
        </Box>
        {notifications?.map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification.id}
              currentNotification={notification}
              setNotificationsCount={setNotificationsCount}
              notificationsCount={notificationsCount}
            />
          );
        })}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
