import { Box, Button, Menu, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UserStateRoot } from '../../store/types/user';
import { useSelector } from 'react-redux';
import { NotificationService } from '../../services/notifications.service';

type NotificationsDropdownProps = {
  notificationIconAnchorEl: HTMLElement | null;
  onClose: () => void;
};

const NotificationsDropdown: React.FunctionComponent<NotificationsDropdownProps> = (props) => {
  const { notificationIconAnchorEl, onClose } = props;
  const open = Boolean(notificationIconAnchorEl);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [notifications, setNotifications] = useState<any | null>();

  const notificationService = new NotificationService();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const notifications = await notificationService.getAllNotificationsByEmployeeId(user.id);
        setNotifications(notifications);
      }
    };
    fetchNotifications();
  }, [user]);

  console.log(notifications);

  const handleMarkAsReadClick = () => {
    console.log('mark as read');
  };

  const handleNotificationClick = () => {
    console.log('notif click');
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
        <Box sx={{ width: '400px' }}>
          <Typography
            sx={{ margin: '15px', marginTop: 0, paddingBottom: '15px', borderBottom: 1.5, borderColor: 'divider' }}
            fontSize={20}
          >
            Notifications
          </Typography>
        </Box>
        {/*  */}
        <Box
          sx={{
            padding: '15px',
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Box onClick={handleNotificationClick} sx={{ cursor: 'pointer' }}>
                icon
              </Box>
              <Box sx={{ cursor: 'pointer' }} onClick={handleNotificationClick}>
                something else
              </Box>
            </Box>
            <Box fontSize="10px" color="grey">
              24 min ago
            </Box>
          </Box>
          <Button onClick={handleMarkAsReadClick} sx={{ border: 1, borderColor: 'primary.main' }}>
            Mark as read
          </Button>
        </Box>
        {/*  */}
      </Menu>
    </>
  );
};

export default NotificationsDropdown;
