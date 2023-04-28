import { ChangedSkill } from '../models/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillsData() {
    const response = await axios.get(`/skills/getAllByEmployeeId/${process.env.REACT_APP_TEMP_USER_ID}`);
    return response.data;
  }

  public async updateEmployeeSkills(changedSkillsItem: ChangedSkill[]) {
    const response = await axios.put(`/skills/update`, {
      changedSkills: changedSkillsItem,
    });
    return response.data;
  }

  public async getSkillsCategories() {
    const response = await axios.get(`/skills/getSkillsCategories`);
    return response.data;
  }
}
