import { ChangedAchievement } from '../components/achievementsTab/models/interfaces/ChangedAchievement.interface';
import axios from './axios';

export class AchievementsService {
  public async fetchAchievementData() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/achievements/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`,
    );
    return response.data;
  }

  public async updateEmployeeAchievement(obj: ChangedAchievement) {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/achievements/update`, {
      checked: obj.checked,
      achievementStartDate: obj.achievementStartDate,
      achievementEndDate: obj.achievementEndDate,
      achievementId: obj.id,
      employeeId: process.env.REACT_APP_TEMP_USER_ID,
    });
    return response.data;
  }
}
