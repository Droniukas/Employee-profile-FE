import { EmploymentDate } from '../../../models/EmployementData.interface';

export const getDate = (stringDate: string | null): string | null => {
  if (stringDate === null) return null;
  const date = new Date(stringDate);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
};
export const sortByStartDate = (employmentDateA: EmploymentDate, employmentDateB: EmploymentDate) =>
  Number(new Date(employmentDateA.hiringDate)) - Number(new Date(employmentDateB.hiringDate));
