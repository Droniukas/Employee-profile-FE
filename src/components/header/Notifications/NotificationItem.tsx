import { Avatar, Box, Button } from '@mui/material';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { isInactiveOrDismissed } from '../../findEmployee/FindEmployeeResults';
import { Notification } from '../../../models/Notification.interface';
import NotificationTextElement from './NotificationTextElement';
import { NotificationService } from '../../../services/notifications.service';

type NotificationItemProps = {
  notification: Notification;
};

const NotificationItem = (props: NotificationItemProps) => {
  const { notification } = props;
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const elapsedTimeFromCreation = dayjs(notification.notificationCreatedAt).from(dayjs(), true);

  const notificationService = new NotificationService();

  const handleMarkAsReadClick = () => {
    notificationService.setReadById(notification.id);
    // think about is there any ways to delete this from the ui withouth rerendering and refetching the data, take a look how projects does it's deletion
  };

  const handleNotificationClick = () => {
    console.log('notif click');
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
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Box onClick={handleNotificationClick} sx={{ cursor: 'pointer' }}>
            <Avatar
              src={`data:${notification.initiatorEmployee.imageType};base64,${notification.initiatorEmployee.imageBytes}`}
              sx={{
                border: '0.01px solid lightgrey',
                opacity: isInactiveOrDismissed(notification.initiatorEmployee.status) ? 0.35 : 1,
              }}
            />
          </Box>
          <Box sx={{ cursor: 'pointer', fontSize: 12 }} onClick={handleNotificationClick}>
            <NotificationTextElement notification={notification} />
          </Box>
        </Box>
        <Box fontSize="10px" color="grey">
          {elapsedTimeFromCreation} ago
        </Box>
      </Box>
      <Button onClick={handleMarkAsReadClick} sx={{ border: 1, borderColor: 'primary.main' }}>
        Mark as read
      </Button>
    </Box>
  );
};

export default NotificationItem;
