import axios from './axios';

export class EmployeeService {
    public async searchByName(searchValue: string) {
        const response = await axios.get('/employee/search', {
            params: {
                name: searchValue
            }
        });
        return response.data;
    };
    public async searchById(searchValue: string) {
        const response = await axios.get(`/employee/${searchValue}`, {
        });
        return response.data;
    };
}