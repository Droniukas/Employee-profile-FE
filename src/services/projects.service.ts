import { FormikValues } from 'formik';

import { ProjectStatus } from '../components/enums/ProjectStatus';
import MyProject from '../models/MyProject.interface';
import Project from '../models/Project.interface';
import axios from './axios';

export class ProjectsService {
  public async getAllProjects() {
    const response = await axios.get('/project/all', {});
    response.data.map((project: Project) => {
      this.mapProjectStatus(project);
    });
    return response.data;
  }

  public async createProject(project: FormikValues) {
    const response = await axios.post('/project', {
      ...project,
    });
    return response.data;
  }

  public async updateProject(project: FormikValues) {
    const response = await axios.put('/project', {
      ...project,
    });
    return response.data;
  }

  public async deleteProjectById(id: number) {
    await axios.patch(`/project/delete/${id}`, {});
  }

  private mapProjectStatus(project: Project) {
    const today = new Date();
    const startDateFormatted = new Date(project.startDate);
    const endDateFormatted = new Date(project.endDate);

    if (startDateFormatted > today) {
      project.status = ProjectStatus.FUTURE;
    } else {
      if (project.endDate === null || endDateFormatted > today) {
        project.status = ProjectStatus.ONGOING;
      } else {
        project.status = ProjectStatus.FINISHED;
      }
    }
  }

  private mapMyProjectStatus(myProject: MyProject) {
    const today = new Date();
    const startDateFormatted = new Date(myProject.startDate);
    const endDateFormatted = new Date(myProject.endDate);

    if (startDateFormatted > today) {
      myProject.status = ProjectStatus.FUTURE;
    } else {
      if (myProject.endDate === null || endDateFormatted > today) {
        myProject.status = ProjectStatus.ONGOING;
      } else {
        myProject.status = ProjectStatus.FINISHED;
      }
    }
  }

  public async getMyProjects(userId: number) {
    const response = await axios.get(`/project/getMyProjectsByEmployee/${userId}`);
    response.data.map((myProject: MyProject) => {
      this.mapMyProjectStatus(myProject);
    });
    return response.data;
  }

  public async updateMyProject(myProject: FormikValues) {
    const { id, responsibilities } = myProject;
    const data = {
      projectId: id,
      employeeId: this.userId,
      responsibilities: responsibilities,
    };
    const response = await axios.post('project/updateMyProject', data);
    return response.data;
  }
}
