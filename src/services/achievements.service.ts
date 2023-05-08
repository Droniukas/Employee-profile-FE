import { ChangedAchievement } from '../models/ChangedAchievement.interface';
import axios from './axios';

export class AchievementsService {
  public async fetchAchievementsDataByEmployeeId(employeeId: number) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/achievements/getAllByEmployeeId/${employeeId}`);
    return response.data;
  }

  public async updateEmployeeAchievements(changedAchievementsItem: ChangedAchievement[]) {
    const response = await axios.put(`/achievements/update`, {
      changedAchievements: changedAchievementsItem,
    });
    return response.data;
  }

  public async getAchievementsCategories() {
    const response = await axios.get(`/achievements/getAchievementsCategories`);
    return response.data;
  }
}
