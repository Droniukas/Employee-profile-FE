import EmploymentDates from './EmploymentDates.interface';

interface ProjectEmployeeError {
  employeeId: string;
  message: string;
  employmentDates: EmploymentDates[];
}

export default ProjectEmployeeError;
