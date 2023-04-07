import axios from './axios';
import Project from '../models/Project.interface';

export class ProjectsService {
    public async getAllProjects() {
        const response = await axios.get('/project/all', {});
        return response.data;
    };

    public async createProject(project: Project) {
        const response = await axios.post('/project', {project});
        return response.data;

    }
}