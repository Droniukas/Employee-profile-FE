import { FormikValues } from 'formik';

import { ProjectStatus } from '../components/enums/ProjectStatus';
import MyProject from '../models/MyProject.interface';
import MyProjectEmployee from '../models/MyProjectEmployee.interface';
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
  public async getMyProjects() {
    const response = await axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
    const myProjectEmployee = response.data.map((myProjectEmployee: MyProjectEmployee) => {
      console.log(myProjectEmployee);
      return myProjectEmployee;
    });

    const projectIds = myProjectEmployee.map((myProjectEmployee: MyProjectEmployee) => myProjectEmployee.projectId);

    const projectRequests = projectIds.map(() => {
      return axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
    });

    const projectResponses = await Promise.all(projectRequests);
    const projects = projectResponses.map((response: any) => response.data);
    projects.forEach((MyProject) => {
      this.mapMyProjectStatus(MyProject);
    });
    console.log(projects);

    return projects;
  }

  // public async getMyProjects2() {
  //   try {
  //     const response = await axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
  //     const myProjectEmployee: MyProject[] = response.data;

  //     const projectIds = myProjectEmployee.map((myProjectEmployee: MyProject) => myProjectEmployee.id);

  //     const projectRequests = projectIds.map((projectId) => {
  //       let myProjectEmployee: MyProject | undefined = myProjectEmployee.find((p) => p.id === projectId);
  //       if (!myProjectEmployee) throw new Error(`MyProject not found for id ${projectId}`);
  //       myProjectEmployee = this.mapMyProjectStatus(myProjectEmployee);
  //       return myProjectEmployee;
  //     });

  //     const myProjects = await Promise.all(projectRequests);
  //     console.log(myProjects);

  //     return myProjects;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Failed to get my projects');
  //   }
  // }
  public async getMyProjects2() {
    const response = await axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
    return response;
  }

  public async getMyProjects3() {
    const response = await axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
    response.data.map((myProject: MyProject) => {
      this.mapMyProjectStatus(myProject);
    });
    console.log(response);
    return response.data;
  }
  // public async getMyProjectsById() {
  //   try {
  //     const response = await axios.get(`/project/getProjectEmployeeBy/${process.env.REACT_APP_TEMP_USER_ID}`);
  //     const projectPromises = response.data.map(async (projectId: number) => {
  //       const detailedResponse = await axios.get(`/project/get/${projectId}`);
  //       return detailedResponse.data;
  //     });
  //     const myprojects = await Promise.all(projectPromises);
  //     console.log(myprojects);
  //     return myprojects;
  //   } catch (error) {
  //     console.error(error);
  //     // handle the error in an appropriate way (e.g. display an error message to the user)
  //   }
  // }

  public async getResponsibilitiesFromProjectEmployee(projectId: number) {
    const response = await axios.get(`project/responsibilities/${projectId}/${process.env.REACT_APP_TEMP_USER_ID}`);
    const plainText = response.data;
    const responsibilities = plainText.split('\n').filter((line: string) => line.trim() !== '');
    return responsibilities;
  }

  public async addResponsibilitiesToProjectEmployee(myProjectEmployee: MyProjectEmployee) {
    const { projectId, employeeId, responsibilities } = myProjectEmployee;
    const data = {
      projectId: projectId,
      employeeId: employeeId,
      responsibilities: responsibilities,
    };
    const response = await axios.post('project/addResponsibilitiesToProjectEmployee', data);
    console.log(data);

    return response.data;
  }
}
