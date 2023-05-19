import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Avatar, Box, IconButton, Theme, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch } from 'react-redux';

import { Notification } from '../../../models/Notification.interface';
import { NotificationService } from '../../../services/notifications.service';
import { setReadById } from '../../../states/notifications';
import NotificationTextElement from './NotificationTextElement';

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

  const setNotificationReadById = (id: number) => {
    notificationService.setReadById(id, true);
    dispatch(setReadById(id));
  };

  const handleMarkAsReadClick = () => {
    setNotificationReadById(currentNotification.id);
  };

  const handleNotificationClick = () => {
    setNotificationReadById(currentNotification.id);
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
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Box onClick={handleNotificationClick} sx={{ cursor: 'pointer' }}>
          <Avatar
            src={`data:${currentNotification.initiatorEmployee.imageType};base64,${currentNotification.initiatorEmployee.imageBytes}`}
            sx={{
              border: '0.01px solid lightgrey',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ cursor: 'pointer', fontSize: 12, mr: 2 }} onClick={handleNotificationClick}>
            <NotificationTextElement currentNotification={currentNotification} />
          </Box>
          <Box fontSize="10px" color="grey">
            {elapsedTimeFromCreation} ago
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 'auto' }}>
        {!currentNotification.read && (
          <Tooltip title="Mark as read" placement="bottom-end">
            <IconButton sx={{ color: 'primary.main', bottom: 1 }} onClick={handleMarkAsReadClick}>
              <CircleRoundedIcon style={{ fontSize: 10 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default NotificationItem;
