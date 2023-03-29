import axios from './axios';

export class EmployeeService {
    public async searchByName(searchValue: string, page: number, size: number) {
        const response = await axios.get('/employee/search', {
            params: {
                name: searchValue,
                page: page,
                size: size
            }
        });
        return response.data;
    };
    public async getById(id: string) {
        const response = await axios.get(`/employee/get/${id}`, {
        });
        return response.data;
    };
}