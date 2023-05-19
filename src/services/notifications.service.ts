import { NotificationRequestDto } from '../models/NotificationRequestDto';
import axios from './axios';

export class NotificationService {
  public async getAllNotificationsByEmployeeId(employeeId: number) {
    const response = await axios.get(`/notifications/getAllByEmployeeId/${employeeId}`, {});
    console.log(response.data);
    return response.data;
  }

  public async setIsReadById(notificationId: number, read: boolean) {
    await axios.put(`/notifications/setIsReadById/${notificationId}/${read}`);
  }

  public async setIsReadByEmployeeId(employeeId: number, read: boolean) {
    await axios.put(`/notifications/setIsReadByEmployeeId/${employeeId}/${read}`);
  }

  public async createNotifications(notificationRequestDto: NotificationRequestDto) {
    await axios.post(`/notifications/createNotifications`, {
      ...notificationRequestDto,
    });
  }
}
