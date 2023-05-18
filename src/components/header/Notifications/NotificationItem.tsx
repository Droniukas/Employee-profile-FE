import { Avatar, Box, Button, Theme } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Notification } from '../../../models/Notification.interface';
import { NotificationService } from '../../../services/notifications.service';
import NotificationTextElement from './NotificationTextElement';
import { useDispatch } from 'react-redux';
import { setReadById } from '../../../states/notifications';

type NotificationItemProps = {
  currentNotification: Notification;
};

const NotificationItem = (props: NotificationItemProps) => {
  const { currentNotification } = props;
  const dispatch = useDispatch();

  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const elapsedTimeFromCreation = dayjs(currentNotification.notificationCreatedAt).from(dayjs(), true);

  const notificationService = new NotificationService();

  const handleMarkAsReadClick = () => {
    notificationService.setReadById(currentNotification.id, true);
    dispatch(setReadById(currentNotification.id));
  };

  const handleNotificationClick = () => {
    console.log('siyfbsd');
  };

  return (
    <Box
      sx={{
        padding: '15px',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        ...(!currentNotification.read && {
          backgroundColor: '#d8f8f7',
        }),
        transition: (theme: Theme) => theme.transitions.create(['background-color']),
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Box onClick={handleNotificationClick} sx={{ cursor: 'pointer' }}>
            <Avatar
              src={`data:${currentNotification.initiatorEmployee.imageType};base64,${currentNotification.initiatorEmployee.imageBytes}`}
              sx={{
                border: '0.01px solid lightgrey',
              }}
            />
          </Box>
          <Box sx={{ cursor: 'pointer', fontSize: 12 }} onClick={handleNotificationClick}>
            <NotificationTextElement currentNotification={currentNotification} />
          </Box>
        </Box>
        <Box fontSize="10px" color="grey">
          {elapsedTimeFromCreation} ago
        </Box>
      </Box>
      <Button
        disabled={currentNotification.read}
        onClick={handleMarkAsReadClick}
        sx={{ border: 1, borderColor: 'primary.main' }}
      >
        Mark as read
      </Button>
    </Box>
  );
};

export default NotificationItem;
