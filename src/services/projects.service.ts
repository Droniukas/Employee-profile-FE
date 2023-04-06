import axios from './axios';

export class ProjectsService {
    public async getAllProjects() {
        const response = await axios.get('/project/all', {});
        return response.data;
    };
}