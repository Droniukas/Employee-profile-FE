import { Box, Menu, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
  const [onlyShowUnread, setOnlyShowUnread] = useState<boolean>(false);
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '15px' }}>
            <Typography sx={{ fontSize: 20 }}>Notifications</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 14 }}>Only show unread</Typography>
              <Switch sx={{ top: 2 }} checked={onlyShowUnread} onChange={(e) => setOnlyShowUnread(e.target.checked)} />
            </Box>
          </Box>
          <Typography sx={{ mb: '5px', fontSize: 13 }}>LATEST</Typography>
        </Box>
        {notifications
          .filter((notification) => !onlyShowUnread || !notification.read)
          .map((notification) => (
            <NotificationItem
              key={notification.id}
              currentNotification={notification}
              setNotificationsCount={setNotificationsCount}
              notificationsCount={notificationsCount}
            />
          ))}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
