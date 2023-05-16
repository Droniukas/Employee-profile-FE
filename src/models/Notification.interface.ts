import { NotificationType } from '../components/enums/NotificationType';
import Employee from './Employee.interface';
import Project from './Project.interface';

export interface Notification {
  id: number;
  employeeId: number;
  project: Project;
  initiatorEmployee: Employee;
  notificationType: NotificationType;
  notificationCreatedAt: string;
}
