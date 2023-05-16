import { Box, Menu, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { Notification } from '../../../models/Notification.interface';
import { UserStateRoot } from '../../../store/types/user';
import NotificationItem from './NotificationItem';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
  notifications: Notification[];
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose, notifications } = props;
  const open = Boolean(notificationIconAnchorEl);
  const user = useSelector((state: UserStateRoot) => state.userState.value);

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
          <Typography
            sx={{ margin: '15px', marginTop: 0, paddingBottom: '15px', borderBottom: 1.5, borderColor: 'divider' }}
            fontSize={20}
          >
            Notifications
          </Typography>
        </Box>
        {notifications?.map((notification: Notification) => {
          return <NotificationItem key={notification.id} notification={notification} />;
        })}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
