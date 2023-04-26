export interface EmploymentDate {
  hiringDate: string;
  exitDate: string;
}

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
