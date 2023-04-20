import './ProjectForm.scss';

import { Avatar, Box, Checkbox, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import React, { useState } from 'react';

import Employee from '../../models/Employee.interface';

type ProjectEmployeeAddListProps = {
  employees: Employee[];
  onSelect: (employees: Employee[]) => void;
};

const ProjectEmployeeAddList: React.FC<ProjectEmployeeAddListProps> = (props: ProjectEmployeeAddListProps) => {
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
    <List className="member-list" sx={{ paddingTop: '16px', marginTop: 0 }}>
      {employees.map((employee, index) => (
        <ProjectEmployeeAddItem
          key={index}
          employee={employee}
          selected={selectedEmployees.some((e) => e.id === employee.id)}
          onStateChange={(selected: boolean) => handleEmployeeItemStateChange(index, selected)}
        />
      ))}
    </List>
  );
};

export default ProjectEmployeeAddList;

type ProjectEmployeeAddItemProps = {
  employee: Employee;
  selected: boolean;
  onStateChange: (selected: boolean) => void;
};

const ProjectEmployeeAddItem: React.FC<ProjectEmployeeAddItemProps> = (props: ProjectEmployeeAddItemProps) => {
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
