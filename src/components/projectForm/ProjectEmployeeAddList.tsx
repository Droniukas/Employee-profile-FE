import List from '@mui/material/List';
import React, { useState } from 'react';

import Employee from '../../models/Employee.interface';
import ProjectEmployeeAddItem from './ProjectEmployeeAddItem';

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
    <List sx={{ paddingTop: '8px', marginTop: 1, maxHeight: '20vw', overflowY: 'auto' }}>
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
