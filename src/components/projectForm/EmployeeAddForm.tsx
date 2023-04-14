import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import useDebouncedState from '../../hooks/useDebouncedState';
import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import EmployeeAddList from './EmployeeAddList';

type EmployeeAddFormProps = {
  projectEmployees: Employee[];
  onAdd: (newEmployees: Employee[]) => void;
  onClose: () => void;
};

const EmployeeAddForm: React.FC<EmployeeAddFormProps> = (props: EmployeeAddFormProps) => {
  const { projectEmployees, onAdd, onClose } = props;
  const [nonAddedEmployees, setNonAddedEmployees] = useState<Employee[]>([]);
  const [filteredNonAddedEmployees, setFilteredNonAddedEmployees] = useState<Employee[]>([]);
  const [newEmployees, setNewEmployees] = useState<Employee[]>([]);
  const [searchValue, setSearchValue] = useDebouncedState('', 500);

  const handleSelectedEmployeesChange = (selectedEmployees: Employee[]) => {
    setNewEmployees(selectedEmployees);
  };

  const handleAddClick = () => {
    onAdd(newEmployees);
    onClose();
  };

  useEffect(() => {
    const findNonAddedEmployees = async () => {
      const employeeService = new EmployeeService();
      const allEmployees = await employeeService.getAll();
      const nonAddedEmployees = allEmployees.filter((employee: Employee) => {
        return !projectEmployees.some((projectEmployee) => projectEmployee.id === employee.id);
      });
      setNonAddedEmployees(nonAddedEmployees);
    };

    findNonAddedEmployees();
  }, [projectEmployees]);

  useEffect(() => {
    const filtered = nonAddedEmployees.filter((employee: Employee) => {
      const fullName = `${employee.name}${employee.middleName ? ` ${employee.middleName}` : ''} ${
        employee.surname
      }`.toLowerCase();
      return fullName.includes(searchValue.toLowerCase());
    });
    setFilteredNonAddedEmployees(filtered);
  }, [searchValue, nonAddedEmployees]);

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button sx={{ width: 15, height: 30 }} onClick={onClose}>
          <CloseIcon fontSize="medium" />
        </Button>
      </Box>
      <Box sx={{ marginX: 10 }}>
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
        <EmployeeAddList
          employees={searchValue ? filteredNonAddedEmployees : nonAddedEmployees}
          onSelect={handleSelectedEmployeesChange}
        />
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
export default EmployeeAddForm;
