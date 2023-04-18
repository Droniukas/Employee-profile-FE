import { ChangedSkill } from '../models/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillData() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/skills/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`,
    );
    return response.data;
  }

  public async updateEmployeeSkill(changedSkillsItem: ChangedSkill[]) {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/skills/newUpdate`, {
      changedSkills: changedSkillsItem,
    });
    return response.data;
  }
}
