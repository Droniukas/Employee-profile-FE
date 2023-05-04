import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import ProjectEmployeeAddList from './ProjectEmployeeAddList';

type ProjectEmployeeAddFormProps = {
  projectEmployees: ProjectEmployee[];
  onAdd: (newProjectEmployees: ProjectEmployee[]) => void;
  onClose: () => void;
};

const ProjectEmployeeAddForm: React.FC<ProjectEmployeeAddFormProps> = (props: ProjectEmployeeAddFormProps) => {
  const { projectEmployees, onAdd, onClose } = props;
  const [newProjectEmployees, setNewProjectEmployees] = useState<ProjectEmployee[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<Employee[]>([]);

  const employeeService = new EmployeeService();

  const getNonAddedEmployees = async () => {
    const searchResult = await employeeService.searchByNameSkillsAchievements(searchValue, 0, 0, false);
    const filteredResult = searchResult.employees.filter((employee: Employee) => {
      return !projectEmployees.some((projectEmployee) => projectEmployee.id === employee.id);
    });
    setSearchResult(filteredResult);
  };

  const handleSelectionChange = (selectedEmployees: Employee[]) => {
    const newProjectEmployees = selectedEmployees.map((employee) => ({
      ...employee,
      projectEmployeeStatus: 'ACTIVE',
      projectEmployeeStartDate: '',
      projectEmployeeEndDate: '',
    }));
    setNewProjectEmployees(newProjectEmployees);
  };

  const handleAddClick = () => {
    onAdd(newProjectEmployees);
    onClose();
  };

  useEffect(() => {
    getNonAddedEmployees();
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        getNonAddedEmployees();
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button sx={{ width: 15, height: 30 }} onClick={onClose}>
          <CloseIcon fontSize="medium" />
        </Button>
      </Box>
      <Box sx={{ marginX: 5 }}>
        <Typography
          variant="h1"
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
          placeholder="Search employees by name..."
          onChange={(value) => {
            setSearchValue(value);
          }}
        />
        <ProjectEmployeeAddList employees={searchResult} onSelect={handleSelectionChange} />
      </Box>
      <Divider variant="fullWidth" />
      <Box display={'flex'} justifyContent={'flex-end'} my={1}>
        <Button variant="contained" color="info" sx={{ m: 1 }} onClick={onClose}>
          Cancel
        </Button>
        <Button sx={{ m: 1 }} variant="contained" onClick={handleAddClick}>
          Add
        </Button>
      </Box>
    </Dialog>
  );
};
export default ProjectEmployeeAddForm;
