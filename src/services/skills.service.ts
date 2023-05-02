import { ChangedSkill } from '../models/ChangedSkill.interface';
import axios from './axios';

export class SkillsService {
  public async fetchSkillsDataByEmployeeId(employeeId: number) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/skills/getAllByEmployeeId/${employeeId}`);
    return response.data;
  }

  public async updateEmployeeSkills(changedSkillsItem: ChangedSkill[]) {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/skills/update`, {
      changedSkills: changedSkillsItem,
    });
    return response.data;
  }
}
