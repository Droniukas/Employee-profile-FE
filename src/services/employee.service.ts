import qs from 'qs';

import axios from './axios';

export class EmployeeService {
  public async searchByNameSkillsAchievements(
    searchValue: string,
    skills: number[],
    achievements: number[],
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
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'comma' });
      },
    });
    return response.data;
  }

  public async getById(id: string) {
    const response = await axios.get(`/employee/get/${id}`, {});
    return response.data;
  }
}
