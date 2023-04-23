import { Divider, List } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeEditItem from './ProjectEmployeeEditItem';

type ProjectEmployeeEditListProps = {
  projectEmployees: ProjectEmployee[];
  updateProjectEmployee: (updatedProjectEmployee: ProjectEmployee) => void;
  deleteProjectEmployee: (projectEmployeeId: number) => void;
};
const ProjectEmployeeEditList: React.FC<ProjectEmployeeEditListProps> = (props: ProjectEmployeeEditListProps) => {
  const { projectEmployees, updateProjectEmployee, deleteProjectEmployee } = props;
  const [sortedProjectEmployees, setSortedProjectEmployees] = useState<ProjectEmployee[]>([]);

  useEffect(() => {
    const sortedCopy = [...projectEmployees].sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return a.surname.localeCompare(b.surname, undefined, { sensitivity: 'base' });
    });
    setSortedProjectEmployees(sortedCopy);
  }, [projectEmployees]);

  const handleProjectEmployeeStateChange = (updatedProjectEmployee: ProjectEmployee) => {
    updateProjectEmployee(updatedProjectEmployee);
  };

  return (
    <List sx={{ marginTop: '8px' }}>
      {sortedProjectEmployees.map((projectEmployee, index) => (
        <React.Fragment key={projectEmployee.id}>
          <ProjectEmployeeEditItem
            projectEmployee={projectEmployee}
            onUpdate={handleProjectEmployeeStateChange}
            onDelete={deleteProjectEmployee}
          />
          {index !== sortedProjectEmployees.length - 1 && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </List>
  );
};
export default ProjectEmployeeEditList;
