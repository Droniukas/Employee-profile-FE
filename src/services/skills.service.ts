import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillData() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/skills/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`,
    );
    return response.data;
  }

  public async updateEmployeeSkill(obj: ChangedSkill) {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/skills/update`, {
      checked: obj.checked,
      skillLevel: obj.skillLevel,
      skillId: obj.id,
      employeeId: process.env.REACT_APP_TEMP_USER_ID,
    });
    return response.data;
  }
}
