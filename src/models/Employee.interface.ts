import { EmploymentDate } from './EmployementData.interface';

interface Employee {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  title: string;
  status: string;
  imageType: string;
  imageBytes: string;
  isManager: boolean;
  employmentDates: EmploymentDate[];
}

export default Employee;
