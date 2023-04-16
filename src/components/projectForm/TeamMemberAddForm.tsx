import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import TeamMemberAddList from './TeamMemberAddList';

type TeamMemberAddFormProps = {
  teamMembers: ProjectEmployee[];
  onAdd: (newTeamMembers: ProjectEmployee[]) => void;
  onClose: () => void;
};

const TeamMemberAddForm: React.FC<TeamMemberAddFormProps> = (props: TeamMemberAddFormProps) => {
  const { teamMembers, onAdd, onClose } = props;
  const [nonTeamMembers, setNonTeamMembers] = useState<Employee[]>([]);
  const [filterResults, setFilterResults] = useState<Employee[]>([]);
  const [newTeamMembers, setNewTeamMembers] = useState<ProjectEmployee[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSelectionChange = (selectedEmployees: Employee[]) => {
    const newTeamMembers = selectedEmployees.map((employee) => ({
      ...employee,
      teamMemberStatus: 'ACTIVE',
      teamMemberStartDate: dayjs().toISOString(),
      teamMemberEndDate: '',
    }));
    setNewTeamMembers(newTeamMembers);
  };

  const handleAddClick = () => {
    onAdd(newTeamMembers);
    onClose();
  };

  useEffect(() => {
    const findNonAddedEmployees = async () => {
      const employeeService = new EmployeeService();
      const allEmployees = await employeeService.getAll();
      const nonTeamMembers = allEmployees.filter((employee: Employee) => {
        return !teamMembers.some((teamMember) => teamMember.id === employee.id);
      });
      setNonTeamMembers(nonTeamMembers);
      setFilterResults(nonTeamMembers);
    };

    findNonAddedEmployees();
  }, [teamMembers]);

  const getFilterResults = () => {
    const filtered = nonTeamMembers.filter((employee: Employee) => {
      const fullName = `${employee.name}${employee.middleName ? ` ${employee.middleName}` : ''} ${
        employee.surname
      }`.toLowerCase();
      return fullName.includes(searchValue.toLowerCase());
    });
    setFilterResults(filtered);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        getFilterResults();
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
        <TeamMemberAddList employees={filterResults} onSelect={handleSelectionChange} />
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
export default TeamMemberAddForm;
