import './ProjectForm.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React from 'react';

import Employee from '../../models/Employee.interface';
import EmployeeListItem from './EmployeeListItem';

type EmployeeListProps = {
  employees: Employee[];
};

const EmployeeList: React.FC<EmployeeListProps> = (props: EmployeeListProps) => {
  const { employees } = props;

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
          Add
        </Button>
      </Box>
    </>
  );
};
export default EmployeeList;
