import ProjectEmployee from './ProjectEmployee.interface';

interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  projectEmployees: ProjectEmployee[];
  status: string;
}

export default Project;
