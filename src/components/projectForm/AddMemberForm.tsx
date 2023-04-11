import { Box, Dialog, Typography } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import Project from '../../models/Project.interface';
import { ProjectsService } from '../../services/projects.service';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import Employee from '../../models/Employee.interface';
import FindEmployeeResults from '../findEmployee/FindEmployeeResults';

type Props = {
  project: Project;
};

const AddMemberForm: React.FC<Props> = ({ project }) => {
  const [inputValue, _setInputValue] = useState('');
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setfilteredEmployees] = useState<Employee[]>([]);
  const inputValueRef = useRef(inputValue);

  const projectsService = new ProjectsService();
  const employeeService = new EmployeeService();

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        getEmployees();
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  function setInputValue(val: string) {
    inputValueRef.current = val;
    _setInputValue(val);
  }

  const getEmployees = async () => {
    const result = await employeeService.searchByName(inputValueRef.current, 0, 10);
    setfilteredEmployees(result.employees);
  };

  return (
    <Dialog open={true} maxWidth="sm">
      <Box component="form" sx={{ marginX: 5, marginY: 3 }}>
        <Typography
          variant="h1"
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
          placeholder="Search employees by name, skills projects or achievements..."
          onChange={(value) => setInputValue(value)}
        />
        {filteredEmployees.length > 0 ? (
          <FindEmployeeResults results={filteredEmployees} />
        ) : (
          <FindEmployeeResults results={allEmployees} />
        )}
      </Box>
    </Dialog>
  );
};
export default AddMemberForm;
