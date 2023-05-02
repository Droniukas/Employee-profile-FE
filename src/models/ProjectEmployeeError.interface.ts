import EmploymentDates from './EmploymentDates.interface';

interface ProjectEmployeeError {
  employeeId: number;
  message: string;
  employmentDates: EmploymentDates[];
}

export default ProjectEmployeeError;
