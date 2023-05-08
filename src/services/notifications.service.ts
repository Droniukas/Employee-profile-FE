import axios from './axios';

export class NotificationService {
  public async getAllNotificationsByEmployeeId(employeeId: number) {
    const response = await axios.get(`/notifications/getAllByEmployeeId/${employeeId}`, {});
    return response.data;
  }
}
