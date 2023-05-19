import { Box, Theme } from '@mui/material';

import { Notification } from '../../../models/Notification.interface';
import { NotificationType } from '../../enums/NotificationType';

type NotificationTextElementProps = {
  currentNotification: Notification;
};

const NotificationTextElement = (props: NotificationTextElementProps) => {
  const { currentNotification } = props;
  let notificationText: JSX.Element = <></>;
  switch (currentNotification.notificationType) {
    case NotificationType.ADD_EMPLOYEE: {
      notificationText = (
        <>
          You were added to project {`'${currentNotification.project.title}'`} by
          {` ${currentNotification.initiatorEmployee.name} ${currentNotification.initiatorEmployee.surname}`}.
        </>
      );
      break;
    }
    case NotificationType.REMOVE_EMPLOYEE: {
      notificationText = (
        <>
          You were removed from project {`'${currentNotification.project.title}'`} by
          {` ${currentNotification.initiatorEmployee.name} ${currentNotification.initiatorEmployee.surname}`}.
        </>
      );
      break;
    }
    case NotificationType.UPDATE_PROJECT_INFORMATION: {
      notificationText = (
        <>
          Your project {`'${currentNotification.project.title}'`} information has been updated by
          {` ${currentNotification.initiatorEmployee.name} ${currentNotification.initiatorEmployee.surname}`}.
        </>
      );
      break;
    }
  }
  return (
    <Box
      sx={{
        ...(!currentNotification.read && {
          fontWeight: 'bold',
        }),
        transition: (theme: Theme) => theme.transitions.create(['background-color']),
      }}
    >
      {notificationText}
    </Box>
  );
};

export default NotificationTextElement;
