import Employee from '../../models/Employee.interface';

export interface UserStateRoot {
  userState: {
    value: Employee;
  };
}
