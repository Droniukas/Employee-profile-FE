import ProjectEmployee from './ProjectEmployee.interface';

interface Project {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  projectEmployees: ProjectEmployee[];
  status: string;
}

export default Project;
