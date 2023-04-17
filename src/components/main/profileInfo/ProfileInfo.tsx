import { Avatar, Box } from '@mui/material';
import React from 'react';

import Employee from '../../../models/Employee.interface';

type ProfileInfoProps = {
  employee: Employee;
};

const ProfileInfo: React.FC<ProfileInfoProps> = (props: ProfileInfoProps) => {
  const { employee } = props;

  if (!employee) return null;

  return (
    <>
      <Box sx={{ position: 'relative', padding: '150px', marginLeft: 20, paddingRight: 100 }}>
        <Avatar
          src={`data:${employee?.imageType};base64,${employee?.imageBytes}`}
          sx={{ position: 'absolute', width: 120, height: 120, left: '5vw', top: 200 }}
        />
        <h1 className="name">
          {employee.name} {employee.middleName} {employee.surname}
        </h1>
        <h4 className="position">{employee.title}</h4>
      </Box>
    </>
  );
};

export default ProfileInfo;
