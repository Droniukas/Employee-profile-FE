import axios from './axios';

export class ProjectsService {
  public async getAllProjects() {
    const response = await axios.get('/project/all', {});
    return response.data;
  }

  public async createProject( project: FormikValues) {
    const response = await axios.post('/project', {
      ...project
    });
    return response.data;
  }

  public async updateProject( project: FormikValues) {
    const response = await axios.put('/project', {
      ...project
    });
    return response.data;
  }
    public async deleteProjectById(id: string) {
        await axios.patch(`/project/delete/${id}`, {});
      }
}
