import './ProjectForm.scss';

import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import EmployeeItemState from '../../models/EmployeeItemState.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { ProjectsService } from '../../services/projects.service';
import AddEmployeeItem from './AddEmployeeItem';
import ViewEmployeeItem from './ViewEmployeeItem';

type EmployeeListProps = {
  employees: Employee[];
  projectId?: string;
  viewType: string;
};

const EmployeeList: React.FC<EmployeeListProps> = (props: EmployeeListProps) => {
  const { employees, projectId, viewType } = props;
  const [projectEmployees, setProjectEmployees] = useState<ProjectEmployee[]>([]);
  const [employeeItemState, setEmployeeItemState] = useState<EmployeeItemState[]>([]);

  useEffect(() => {
    const projectsService = new ProjectsService();
    const mapProjectEmployees = async (projectId: string) => {
      const projectEmployeesRelationships =
        await projectsService.getProjectRelationshipsByProjectId(projectId);
      setProjectEmployees(
        projectEmployeesRelationships.map((projectEmployee: ProjectEmployee) => {
          const employee = employees.find((employee) => employee.id === projectEmployee.employeeId);
          return { ...projectEmployee, employee: employee };
        }),
      );
    };
    if (projectId) {
      mapProjectEmployees(projectId);
    }
  }, [projectId, employees]);

  const handleEmployeeItemStateChange = (
    index: number,
    newEmployeeItemState: EmployeeItemState,
  ) => {
    setEmployeeItemState((prevState) => {
      const newState = [...prevState];
      newState[index] = newEmployeeItemState;
      return newState;
    });
  };

  switch (viewType) {
    case 'addEmployeeView':
      return (
        <List className='member-list' sx={{ marginTop: '24px' }}>
          {employees.map((employee, index) => (
            <AddEmployeeItem
              key={employee.id}
              employee={employee}
              state={employeeItemState[index]}
              onStateChange={(newEmployeeItemState: EmployeeItemState) =>
                handleEmployeeItemStateChange(index, newEmployeeItemState)
              }
            />
          ))}
        </List>
      );
    case 'projectView':
      return (
        <List>
          {projectEmployees.map((projectEmployee) => (
            <ViewEmployeeItem key={projectEmployee.employeeId} projectEmployee={projectEmployee} />
          ))}
        </List>
      );
    default:
      return null;
  }
};
export default EmployeeList;
