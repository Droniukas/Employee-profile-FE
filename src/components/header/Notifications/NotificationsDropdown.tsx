import { Box, Link, Menu, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { notificationsRoot } from '../../../store/types/notifications';
import NotificationItem from './NotificationItem';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose } = props;
    const [onlyShowUnread, setOnlyShowUnread] = useState<boolean>(false);
  const open = Boolean(notificationIconAnchorEl);
  const notifications = useSelector((state: notificationsRoot) => state.notifications.value);

  const handleMarkAllAsReadClick = () => {
    console.log('Needs to be implemented');
  };

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
        <Box sx={{ minWidth: '350px', mx: '15px', mb: '5px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '15px' }}>
            <Typography sx={{ fontSize: 20 }}>Notifications</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 14 }}>Only show unread</Typography>
              <Switch
                sx={{ top: 2, mr: '-12px' }}
                checked={onlyShowUnread}
                onChange={(e) => setOnlyShowUnread(e.target.checked)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ ml: '1px', fontSize: 12 }}>LATEST</Typography>
            <Link component="button" underline="hover" onClick={handleMarkAllAsReadClick}>
              <Typography sx={{ fontSize: 12 }}>Mark all as read</Typography>
            </Link>
          </Box>
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
            {notifications?
          .filter((notification) => !onlyShowUnread || !notification.read)
            .map((notification: Notification) => {
              return <NotificationItem key={notification.id} currentNotification={notification} />;
            })}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
