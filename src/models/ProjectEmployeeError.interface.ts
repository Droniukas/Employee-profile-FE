import { EmploymentDate } from './EmploymentDate.interface';

interface ProjectEmployeeError {
  employeeId: number;
  message: string;
  employmentDates: EmploymentDate[];
}

export default ProjectEmployeeError;
