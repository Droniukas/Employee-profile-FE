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

  public async getById(id: number) {
    const response = await axios.get(`/employee/get/${id}`, {});
    return response.data;
  }

  public async getByEmail(email?: string) {
    const response = await axios.get(`/employee/getByEmail/${email}`, {});
    return response.data;
  }
}
