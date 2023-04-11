import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillData() {
    const response = await axios.get(
      `http://localhost:8080/api/skills/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`,
    );
    return response.data;
  }

  public async updateEmployeeSkill(obj: ChangedSkill) {
    const response = await axios.put('http://localhost:8080/api/skills/update', {
      checked: obj.checked,
      skillLevel: obj.skillLevel,
      skillId: obj.id,
      employeeId: process.env.REACT_APP_TEMP_USER_ID,
    });
    return response.data;
  }
}
