import Employee from './Employee.interface';

interface ProjectEmployee {
  id: string;
  projectId: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  employee: Employee;
}

export default ProjectEmployee;
