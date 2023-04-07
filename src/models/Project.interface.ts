import Employee from './Employee.interface';

interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  employees: Employee[];
}

export default Project;
