import moment from 'moment';

import { EmploymentDate } from '../../../models/EmploymentDate.interface';

export const getDate = (date: string | null): string | null => {
  if (date === null) return null;
  return moment(date).format('YYYY/MM/DD');
};
export const sortByStartDate = (employmentDateA: EmploymentDate, employmentDateB: EmploymentDate) =>
  Number(new Date(employmentDateA.hiringDate)) - Number(new Date(employmentDateB.hiringDate));
