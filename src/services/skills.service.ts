import { ChangedSkill } from '../models/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillsData() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/skills/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`,
    );
    return response.data;
  }

  public async updateEmployeeSkills(changedSkillsItem: ChangedSkill[]) {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/skills/newUpdate`, {
      changedSkills: changedSkillsItem,
    });
    return response.data;
  }
}
