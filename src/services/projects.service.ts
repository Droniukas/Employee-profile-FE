import { FormikValues } from 'formik';

import { ProjectStatus } from '../components/enums/ProjectStatus';
import MyProjectEmployee from '../models/MyProjectEmployee';
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
  public async getMyProjects() {
    const response = await axios.get('/project/projectsByEmployeeId/' + `${process.env.REACT_APP_TEMP_USER_ID}`);
    const myProjectEmployee = response.data.map((myProjectEmployee: MyProjectEmployee) => {
      return myProjectEmployee;
    });

    const projectIds = myProjectEmployee.map((myProjectEmployee: MyProjectEmployee) => myProjectEmployee.projectId);

    const projectRequests = projectIds.map((projectId: string) => {
      return axios.get(`/project/get/${projectId}`);
    });

    const projectResponses = await Promise.all(projectRequests);
    const projects = projectResponses.map((response: any) => response.data);
    projects.forEach((project: Project) => {
      this.mapProjectStatus(project);
    });

    return projects;
  }

  public async getResponsibilitiesFromProjectEmployee(projectId: string) {
    const response = await axios.get(`project/responsibilities/${projectId}/${process.env.REACT_APP_TEMP_USER_ID}`);
    const plainText = response.data;
    const responsibilities = plainText.split('\n').filter((line: string) => line.trim() !== '');
    return responsibilities;
    return response.data;
  }

  public async addResponsibilitiesToProjectEmployee(myProjectEmployee: MyProjectEmployee) {
    const { projectId, employeeId, responsibilities } = myProjectEmployee;
    const data = {
      projectId: projectId,
      employeeId: employeeId,
      responsibilities: responsibilities,
    };
    const response = await axios.post('project/projects-employee-responsibilities', data);
    return response.data;
  }
  public async addResponsibilitiesToForm(myProjectEmployee: MyProjectEmployee) {
    const { projectId, employeeId, responsibilities } = myProjectEmployee;
    const data = {
      projectId: projectId,
      employeeId: employeeId,
      responsibilities: responsibilities,
    };
    const response = await axios.post('project/projects-employee-responsibilities', data);
    return response.data;
  }
}
