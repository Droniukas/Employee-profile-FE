import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import useDebouncedState from '../../hooks/useDebouncedState';
import Employee from '../../models/Employee.interface';
import Project from '../../models/Project.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import EmployeeList from './EmployeeList';

type AddEmployeeFormProps = {
  project?: Project;
  onClose: () => void;
};

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = (props: AddEmployeeFormProps) => {
  const { project, onClose } = props;
  const [allNonAddedEmployees, setAllNonAddedEmployees] = useState<Employee[]>([]);
  const [filteredNonAddedEmployees, setFilteredNonAddedEmployees] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useDebouncedState('', 500);

  // When adding a new project, return all employees.
  // When editing a project, return all employees that are not already added to the project.
  const allNonAddedEmployeesMemo = useMemo(async () => {
    const employeeService = new EmployeeService();
    const allEmployees = await employeeService.getAll();

    if (project) {
      return allEmployees.filter((employee: Employee) => {
        return !project.employees.some(
          (addedEmployee: Employee) => addedEmployee.id === employee.id,
        );
      });
    } else {
      return allEmployees;
    }
  }, [project]);

  // Filter employees that are not added to the project by search value.
  useEffect(() => {
    allNonAddedEmployeesMemo.then((employees: Employee[]) => setAllNonAddedEmployees(employees));
    const getFilteredEmployees = () => {
      setFilteredNonAddedEmployees(
        allNonAddedEmployees.filter((employee: Employee) => {
          const fullName = `${employee.name}${
            employee.middleName ? ` ${employee.middleName}` : ''
          } ${employee.surname}`.toLowerCase();
          return fullName.includes(searchValue.toLowerCase());
        }),
      );
    };
    getFilteredEmployees();
  }, [searchValue, allNonAddedEmployees, allNonAddedEmployeesMemo]);

  return (
    <Dialog open={true} fullWidth maxWidth='sm'>
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button sx={{ width: 15, height: 30 }} onClick={onClose}>
          <CloseIcon fontSize='medium' />
        </Button>
      </Box>
      <Box component='form' sx={{ marginX: 10, marginY: 3 }}>
        <Typography
          variant='h1'
          sx={{
            mb: 3,
            fontWeight: 400,
            fontSize: 25,
            fontStyle: 'Regular',
            color: 'primary.main',
          }}
        >
          Add team members
        </Typography>
        <SearchInput
          placeholder='Search employees by name...'
          onChange={(value) => {
            setSearchValue(value);
          }}
        />
        <EmployeeList
          employees={searchValue ? filteredNonAddedEmployees : allNonAddedEmployees}
          viewType={'addEmployeeView'}
        />
        <Divider variant='fullWidth' />
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button variant='contained' color='info' sx={{ m: 1 }} onClick={onClose}>
            Cancel
          </Button>
          <Button sx={{ m: 1 }} variant='contained'>
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default AddEmployeeForm;
