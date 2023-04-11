import { Box, Dialog, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Project from '../../models/Project.interface';
import SearchInput from '../inputs/SearchInput';
import Employee from '../../models/Employee.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import FindEmployeeResults from '../findEmployee/FindEmployeeResults';
import { EmployeeService } from '../../services/employee.service';
import { ProjectsService } from '../../services/projects.service';

type Props = {
  project?: Project;
};

const AddMemberForm: React.FC<Props> = ({ project }) => {
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
    <Dialog open={true} maxWidth='sm'>
      <Box component='form' sx={{ marginX: 5, marginY: 3 }}>
        <Typography
          variant='h1'
          sx={{
            mb: 2,
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
          <FindEmployeeResults results={allNonAddedEmployees} />
        ) : (
          <FindEmployeeResults results={allNonAddedEmployees} />
        )}
      </Box>
    </Dialog>
  );
};
export default AddMemberForm;
