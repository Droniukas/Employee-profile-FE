import { Notification } from '../../models/Notification.interface';

export interface notificationsRoot {
  notifications: {
    value: Notification[];
  };
}
