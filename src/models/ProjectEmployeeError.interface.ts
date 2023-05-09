import { EmploymentDate } from './EmployementData.interface';

interface ProjectEmployeeError {
  employeeId: number;
  message: string;
  employmentDates: EmploymentDate[];
}

export default ProjectEmployeeError;
