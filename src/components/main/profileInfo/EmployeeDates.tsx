import React from 'react';
import Employee from '../../../models/Employee.interface';

type EmployeeDatesProps = {
  employee: Employee;
};

const EmployeeDates: React.FunctionComponent<EmployeeDatesProps> = (props) => {
  const { employee } = props;
  let employmentDates = '';
  employee.employmentDates.forEach((date, index) => {
    if (index === 0) {
      employmentDates += `From ${date.hiringDate} to ${date.exitDate}, `;
    }
    if (index === employee.employmentDates.length - 1) {
      employmentDates += `from ${date.hiringDate} to ${date.exitDate}`;
    } else {
      employmentDates += `from ${date.hiringDate} to ${date.exitDate}, `;
    }
  });
  console.log(employmentDates);
  // fix date formating, times when end date is null and finish implementing
  return (
    <>
      {employee.employmentDates.map((date) => {
        return <div key={date.hiringDate}>return date.hiringDate;</div>;
      })}
    </>
  );
};

export default EmployeeDates;
