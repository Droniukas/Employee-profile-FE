import axios from './axios';

export class EmployeeService {
  public async searchByName(searchValue: string, page: number, size: number, isLimited?: boolean) {
    const response = await axios.get('/employee/search', {
      params: {
        name: searchValue,
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

  public async getLoggedInUser() {
    const response = await axios.get(`/users/me`, {});
    return response.data;
  }
}
