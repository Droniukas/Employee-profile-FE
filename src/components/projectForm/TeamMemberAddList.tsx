import './ProjectForm.scss';

import { Avatar, Box, Checkbox, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import React, { useState } from 'react';

import Employee from '../../models/Employee.interface';

type TeamMemberAddListProps = {
  employees: Employee[];
  onSelect: (employees: Employee[]) => void;
};

const TeamMemberAddList: React.FC<TeamMemberAddListProps> = (props: TeamMemberAddListProps) => {
  const { employees, onSelect } = props;
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const handleEmployeeItemStateChange = (index: number, selected: boolean) => {
    const employeeToUpdate = { ...employees[index] };
    const updateSelectedEmployees = selected
      ? [...selectedEmployees, employeeToUpdate]
      : selectedEmployees.filter((employee) => employee.id !== employeeToUpdate.id);
    setSelectedEmployees(updateSelectedEmployees);

    onSelect(updateSelectedEmployees);
  };

  return (
    <List className="member-list" sx={{ paddingTop: '24px' }}>
      {employees.map((employee, index) => (
        <TeamMemberAddItem
          key={index}
          employee={employee}
          selected={selectedEmployees.some((e) => e.id === employee.id)}
          onStateChange={(selected: boolean) => handleEmployeeItemStateChange(index, selected)}
        />
      ))}
    </List>
  );
};

export default TeamMemberAddList;

type TeamMemberAddItemProps = {
  employee: Employee;
  selected: boolean;
  onStateChange: (selected: boolean) => void;
};

const TeamMemberAddItem: React.FC<TeamMemberAddItemProps> = (props: TeamMemberAddItemProps) => {
  const { employee, selected, onStateChange } = props;

  return (
    <>
      <ListItem sx={{ padding: 0 }}>
        <Box display={'flex'} sx={{ alignItems: 'center' }}>
          <Checkbox
            sx={{ alignSelf: 'center', mr: 0.5 }}
            checked={selected}
            onChange={() => onStateChange(!selected)}
          />
          <ListItemAvatar>
            <Avatar
              src={`data:${employee.imageType};base64,${employee.imageBytes}`}
              sx={{
                border: '0.01px solid lightgrey',
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              employee.middleName
                ? `${employee.name} ${employee.middleName} ${employee.surname}`
                : `${employee.name} ${employee.surname}`
            }
            secondary={employee.title}
            sx={{
              color: '#000048',
            }}
          />
        </Box>
      </ListItem>
    </>
  );
};
