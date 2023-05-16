import { NotificationType } from '../../enums/NotificationType';
import { Notification } from '../../../models/Notification.interface';

type NotificationTextElementProps = {
  notification: Notification;
};

const NotificationTextElement = (props: NotificationTextElementProps) => {
  const { notification } = props;
  let notificationText: JSX.Element = <></>;
  switch (notification.notificationType) {
    case NotificationType.ADD_EMPLOYEE: {
      notificationText = (
        <>
          You were added to a project {`'${notification.project.title}'`} by
          {` ${notification.initiatorEmployee.name} ${notification.initiatorEmployee.surname}`}
        </>
      );
      break;
    }
    case NotificationType.REMOVE_EMPLOYEE: {
      notificationText = (
        <>
          You were added removed from a project {`'${notification.project.title}'`} by
          {` ${notification.initiatorEmployee.name} ${notification.initiatorEmployee.surname}`}.
        </>
      );
      break;
    }
    case NotificationType.UPDATE_PROJECT_INFORMATION: {
      notificationText = <>Your project {`'${notification.project.title}'`} information has been updated.</>;
      break;
    }
    case NotificationType.UPDATE_PROJECT_STATUS: {
      notificationText = <>Your project {`'${notification.project.title}'`} status has been updated.</>;
    }
  }
  return notificationText;
};

export default NotificationTextElement;
