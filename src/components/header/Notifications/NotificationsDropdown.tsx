import { Box, Link, Menu, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notificationsRoot } from '../../../store/types/notifications';
import NotificationItem from './NotificationItem';
import { Notification } from '../../../models/Notification.interface';
import { NotificationService } from '../../../services/notifications.service';
import { UserStateRoot } from '../../../store/types/user';
import { setReadByEmployeeId } from '../../../states/notifications';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose } = props;
  const [onlyShowUnread, setOnlyShowUnread] = useState<boolean>(false);
  const open = Boolean(notificationIconAnchorEl);
  const notifications = useSelector((state: notificationsRoot) => state.notifications.value);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const notificationService = new NotificationService();
  const dispatch = useDispatch();

  const handleMarkAllAsReadClick = () => {
    notificationService.setReadByEmployeeId(user.id, true);
    dispatch(setReadByEmployeeId(user.id));
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
            {notifications.length > 0 && (
              <>
                <Typography sx={{ ml: '1px', fontSize: 12 }}>LATEST</Typography>
                <Link
                  component="button"
                  underline="hover"
                  onClick={handleMarkAllAsReadClick}
                  {...(notifications.filter((notification) => !notification.read).length === 0 && {
                    disabled: true,
                    color: 'grey',
                    sx: { cursor: 'default' },
                    underline: 'none',
                  })}
                >
                  <Typography sx={{ fontSize: 12 }}>Mark all as read</Typography>
                </Link>
              </>
            )}
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
        {notifications
          ?.filter((notification) => !onlyShowUnread || !notification.read)
          .map((notification: Notification) => {
            return <NotificationItem key={notification.id} currentNotification={notification} />;
          })}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
