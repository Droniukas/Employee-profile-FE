import { NotificationType } from '../components/enums/NotificationType';

export interface NotificationRequestDto {
  projectId: number;
  initiatorEmployeeId: number;
  notificationType: NotificationType;
  employeeIds: number[];
}
