import { Divider, List, ListItem } from '@mui/material';
import { FormikErrors, FormikHandlers, FormikTouched, getIn } from 'formik';
import React, { useEffect } from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeError from '../../models/ProjectEmployeeError.interface';
import ProjectEmployeeEditItem from './ProjectEmployeeEditItem';

type ProjectEmployeeEditListProps = {
  projectEmployees: ProjectEmployee[];
  formikErrors: FormikErrors<ProjectEmployee>;
  errors: ProjectEmployeeError[];
  touched: FormikTouched<ProjectEmployee>;
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (field: string, value: string) => void;
  deleteProjectEmployee: (projectEmployeeId: number) => void;
};
const ProjectEmployeeEditList: React.FC<ProjectEmployeeEditListProps> = (props: ProjectEmployeeEditListProps) => {
  const { projectEmployees, formikErrors, errors, touched, handleBlur, setFieldValue, deleteProjectEmployee } = props;

  useEffect(() => {
    if (errors.length > 0) {
      const firstProjectEmployeeWithErrorId = errors[0].employeeId;
      const firstErrorElement = document.getElementById(
        `project-employee-edit-item-${firstProjectEmployeeWithErrorId}`,
      );

      if (firstErrorElement) {
        firstErrorElement.style.backgroundColor = 'rgba(0, 0, 72, 0.02)';
        firstErrorElement.style.outline = 'none';
        firstErrorElement.focus({ preventScroll: true });
        setTimeout(() => {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    }
  }, [errors]);

  return (
    <List sx={{ marginTop: '8px' }}>
      {projectEmployees.map((projectEmployee, index) => (
        <React.Fragment key={projectEmployee.id}>
          <ListItem
            tabIndex={-1}
            onBlur={(event) => {
              event.currentTarget.style.backgroundColor = 'inherit';
            }}
            id={`project-employee-edit-item-${projectEmployee.id}`}
            sx={{
              paddingX: 0.5,
            }}
          >
            <ProjectEmployeeEditItem
              index={index}
              projectEmployee={projectEmployee}
              startDateError={getIn(formikErrors, `${index}.projectEmployeeStartDate`)}
              endDateError={getIn(formikErrors, `${index}.projectEmployeeEndDate`)}
              error={errors.find((error) => error.employeeId === projectEmployee.id)}
              isTouched={getIn(touched, `${index}`)}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              onDelete={deleteProjectEmployee}
            />
          </ListItem>
          {index !== projectEmployees.length - 1 && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </List>
  );
};

const ProjectEmployeeEditListMemo = React.memo(ProjectEmployeeEditList);

export default ProjectEmployeeEditListMemo;
