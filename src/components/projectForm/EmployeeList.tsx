import './ProjectForm.scss';

import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
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
  switch (viewType) {
    case 'addEmployeeView':
      return (
        <List className='member-list' sx={{ marginTop: '24px' }}>
          {employees.map((employee) => (
            <AddEmployeeItem key={employee.id} employee={employee} />
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
