import React, { CSSProperties } from 'react';

import Employee from '../../../models/Employee.interface';
import { getDate, sortByStartDate } from './utils';

type EmployeeDatesProps = {
  employee: Employee;
};

const EmployeeDates: React.FunctionComponent<EmployeeDatesProps> = (props) => {
  const { employee } = props;

  if (!employee.employmentDates) return null;

  return (
    <div>
      {employee.employmentDates.sort(sortByStartDate).map((date, index) => {
        const dateDivStyleProp: CSSProperties = { color: 'primary.main', display: 'inline-block' };
        const hiringDateFormated = <div style={dateDivStyleProp}>{getDate(date.hiringDate)}</div>;
        const exitDateFormated = getDate(date.exitDate) ? (
          <div style={dateDivStyleProp}>{getDate(date.exitDate)}</div>
        ) : (
          false
        );
        if (index === 0) {
          return (
            <div key={index} style={{ display: 'inline-block' }}>
              From {hiringDateFormated}
              {exitDateFormated ? <> to {exitDateFormated}, &nbsp;</> : ''}
            </div>
          );
        }
        if (index === employee.employmentDates.length - 1) {
          return (
            <div key={index} style={{ display: 'inline-block' }}>
              from {hiringDateFormated}
              {exitDateFormated ? <>to {exitDateFormated} </> : ''}
            </div>
          );
        } else {
          return (
            <div key={index} style={{ display: 'inline-block' }}>
              from {hiringDateFormated}
              {exitDateFormated ? <> to {exitDateFormated}, &nbsp;</> : ''}
            </div>
          );
        }
      })}
    </div>
  );
};

export default EmployeeDates;
