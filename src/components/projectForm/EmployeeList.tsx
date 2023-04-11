import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React from 'react';
import Employee from '../../models/Employee.interface';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ProjectForm.scss';
import EmployeeListItem from './EmployeeListItem';

type EmployeeListProps = {
  employees: Employee[];
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <>
      <List className='member-list' sx={{ marginTop: '24px' }}>
        {employees.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee} />
        ))}
      </List>
      <Divider variant='fullWidth' />
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button variant='contained' color='info' sx={{ m: 1 }}>
          Cancel
        </Button>
        <Button sx={{ m: 1 }} variant='contained'>
          Save
        </Button>
      </Box>
    </>
  );
};
export default EmployeeList;
