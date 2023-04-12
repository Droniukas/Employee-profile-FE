import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import useDebouncedState from '../../hooks/useDebouncedState';
import Employee from '../../models/Employee.interface';
import Project from '../../models/Project.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { EmployeeService } from '../../services/employee.service';
import { ProjectsService } from '../../services/projects.service';
import SearchInput from '../inputs/SearchInput';
import EmployeeList from './EmployeeList';

type AddEmployeeFormProps = {
  project?: Project;
};

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = (props: AddEmployeeFormProps) => {
  const { project } = props;
  const [allNonAddedEmployees, setAllNonAddedEmployees] = useState<Employee[]>([]);
  const [filteredNonAddedEmployees, setFilteredNonAddedEmployees] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useDebouncedState('', 500);

  // When adding a new project, return all employees.
  // When editing a project, return all employees that are not already added to the project.
  const allNonAddedEmployeesMemo = useMemo(async () => {
    const employeeService = new EmployeeService();
    const projectService = new ProjectsService();
    const allEmployees = await employeeService.getAll();

    if (project) {
      const allProjectEmployees = await projectService.getProjectRelationshipsByProjectId(
        project.id,
      );

      return allEmployees.filter((employee: Employee) => {
        return !allProjectEmployees.some(
          (projectEmployee: ProjectEmployee) => projectEmployee.employeeId === employee.id,
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
          return employee.name.toLowerCase().includes(searchValue.toLowerCase());
        }),
      );
    };
    getFilteredEmployees();
  }, [searchValue, allNonAddedEmployees, allNonAddedEmployeesMemo]);

  return (
    <Dialog open={true} fullWidth maxWidth='md'>
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button sx={{ width: 15, height: 30 }}>
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
        <EmployeeList employees={searchValue ? filteredNonAddedEmployees : allNonAddedEmployees} />
      </Box>
    </Dialog>
  );
};
export default AddEmployeeForm;
