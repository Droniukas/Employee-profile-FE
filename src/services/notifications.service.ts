import { NotificationRequestDto } from '../models/NotificationRequestDto';
import axios from './axios';

export class NotificationService {
  public async getAllNotificationsByEmployeeId(employeeId: number) {
    const response = await axios.get(`/notifications/getAllByEmployeeId/${employeeId}`, {});
    return response.data;
  }

  public async setReadById(notificationId: number, read: boolean) {
    await axios.put(`/notifications/setReadById/${notificationId}/${read}`);
  }

  public async setReadByEmployeeId(employeeId: number, read: boolean) {
    await axios.put(`/notifications/setReadByEmployeeId/${employeeId}/${read}`);
  }

  public async createNotifications(notificationRequestDto: NotificationRequestDto) {
    await axios.post(`/notifications/createNotifications`, {
      ...notificationRequestDto,
    });
  }
}
