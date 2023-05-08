import { Avatar, Box } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Employee from '../../../models/Employee.interface';
import { isInactiveOrDismissed } from '../../findEmployee/FindEmployeeResults';
import StatusChip from '../../findEmployee/StatusChip';
import Loading from '../../loading/Loading';
import EmployeeDates from './EmployeeDates';

type ProfileInfoProps = {
  employee: Employee;
};

const ProfileInfo: React.FC<ProfileInfoProps> = (props: ProfileInfoProps) => {
  const { employee } = props;

  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');

  if (!employee) return null;

  return (
    <>
      <Box sx={{ position: 'relative', padding: '150px', marginLeft: 20, paddingRight: 100 }}>
        {employee.imageBytes && employee.imageType ? (
          <Avatar
            src={`data:${employee?.imageType};base64,${employee?.imageBytes}`}
            sx={{
              position: 'absolute',
              width: 64,
              height: 64,
              left: '5vw',
              top: 150,
              opacity: isInactiveOrDismissed(employee.status) ? 0.35 : 1,
            }}
          />
        ) : (
          <Loading size={64} style={{ position: 'absolute', top: '150', left: '5vw' }} />
        )}
        <h1 className="name">
          {employee.name} {employee.middleName} {employee.surname}
        </h1>
        <h4 className="position">
          {employee.title}{' '}
          {employeeIdParam ? (
            <>
              <span style={{ margin: '0 12px' }}>/</span>
              <StatusChip status={employee.status} />
            </>
          ) : (
            ''
          )}
          {employeeIdParam ? <EmployeeDates employee={employee} /> : ''}
        </h4>
      </Box>
    </>
  );
};

export default ProfileInfo;
