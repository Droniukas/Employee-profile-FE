import ProjectEmployee from './ProjectEmployee.interface';

interface Project {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  projectEmployees: ProjectEmployee[];
  status: string;
  creatorEmployeeId?: number;
}

export default Project;
