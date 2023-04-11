import { Box, Button, Dialog, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Project from '../../models/Project.interface';
import SearchInput from '../inputs/SearchInput';
import Employee from '../../models/Employee.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { EmployeeService } from '../../services/employee.service';
import { ProjectsService } from '../../services/projects.service';
import EmployeeList from './EmployeeList';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  project?: Project;
};

const AddEmployeeForm: React.FC<Props> = ({ project }) => {
  const [searchValue, setSearchValue] = useState('');
  const [allNonAddedEmployees, setAllNonAddedEmployees] = useState<Employee[]>([]);
  const [filteredNonAddedEmployees, setfilteredNonAddedEmployees] = useState<Employee[]>([]);

  const employeeService = new EmployeeService();
  const projectService = new ProjectsService();

  useEffect(() => {
    getAllNonAddedEmployees();

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        getFilteredNonAddedEmployees();
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const getAllNonAddedEmployees = async () => {
    const allEmployees = await employeeService.getAll();

    if (project) {
      const allProjectEmployees = await projectService.getProjectRelationshipsByProjectId(
        project.id,
      );

      setAllNonAddedEmployees(
        allEmployees.filter((employee: Employee) => {
          return !allProjectEmployees.some(
            (projectEmployee: ProjectEmployee) => projectEmployee.employeeId === employee.id,
          );
        }),
      );
    } else {
      setAllNonAddedEmployees(allEmployees);
    }
  };

  const getFilteredNonAddedEmployees = () => {
    // Needs to be implemented
  };

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
          placeholder='Search employees by name, skills projects or achievements...'
          onChange={(value) => setSearchValue(value)}
        />
        {filteredNonAddedEmployees.length > 0 ? (
          <EmployeeList employees={allNonAddedEmployees} />
        ) : (
          <EmployeeList employees={allNonAddedEmployees} />
        )}
      </Box>
    </Dialog>
  );
};
export default AddEmployeeForm;
