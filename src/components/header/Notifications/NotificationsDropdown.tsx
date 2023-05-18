import { Box, Menu, Typography } from '@mui/material';
import React from 'react';

import { Notification } from '../../../models/Notification.interface';
import NotificationItem from './NotificationItem';
import { useSelector } from 'react-redux';
import { notificationsRoot } from '../../../store/types/notifications';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose } = props;
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
        <Box sx={{ width: '400px' }}>
          <Typography sx={{ margin: '15px', marginTop: 0 }} fontSize={20}>
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 && (
          <Box
            sx={{
              padding: '15px',
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}
          >
            You have no notifications
          </Box>
        )}
        {notifications?.map((notification: Notification) => {
          return <NotificationItem key={notification.id} currentNotification={notification} />;
        })}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
