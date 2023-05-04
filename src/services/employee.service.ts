import SearchAchievement from '../models/SearchAchievement.interface';
import SearchSkill from '../models/SearchSkill.interface';
import axios from './axios';

export class EmployeeService {
  public async searchByNameSkillsAchievements(
    searchValue: string,
    skills: SearchSkill[],
    achievements: SearchAchievement[],
    page: number,
    size: number,
    isLimited?: boolean,
  ) {
    const response = await axios.get('/employee/search', {
      params: {
        name: searchValue,
        skills: skills,
        achievements: achievements,
        page: page,
        size: size,
        isLimited: isLimited,
      },
    });
    return response.data;
  }

  public async getById(id: string) {
    const response = await axios.get(`/employee/get/${id}`, {});
    return response.data;
  }
}
