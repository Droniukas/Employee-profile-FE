import { Divider, List, ListItem } from '@mui/material';
import { FormikErrors, FormikTouched, getIn } from 'formik';
import React, { useEffect } from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeError from '../../models/ProjectEmployeeError.interface';
import ProjectEmployeeEditItem from './ProjectEmployeeEditItem';

type ProjectEmployeeEditListProps = {
  projectEmployees: ProjectEmployee[];
  formikErrors: FormikErrors<ProjectEmployee>;
  apiErrors: ProjectEmployeeError[];
  touched: FormikTouched<ProjectEmployee>;
  setFieldValue: (field: string, value: string | undefined) => void;
  setFieldTouched: (field: string, touched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
  deleteProjectEmployee: (projectEmployeeId: number) => void;
};
const ProjectEmployeeEditList: React.FC<ProjectEmployeeEditListProps> = (props: ProjectEmployeeEditListProps) => {
  const { projectEmployees, formikErrors, apiErrors, touched, setFieldValue, setFieldTouched, deleteProjectEmployee } =
    props;

  useEffect(() => {
    if (apiErrors.length > 0) {
      const firstProjectEmployeeWithErrorId = apiErrors[0].employeeId;
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
  }, [apiErrors]);

  return (
    <List sx={{ marginTop: '8px' }}>
      {projectEmployees.map((projectEmployee, index) => (
        <React.Fragment key={projectEmployee.id}>
          <ListItem
            tabIndex={-1}
            onBlur={(event) => {
              event.currentTarget.style.backgroundColor = 'inherit';
              setFieldTouched(`projectEmployees.${index}`, true, true);
            }}
            id={`project-employee-edit-item-${projectEmployee.id}`}
            sx={{
              paddingX: 0.5,
            }}
          >
            <ProjectEmployeeEditItem
              index={index}
              projectEmployee={projectEmployee}
              formikErrors={getIn(formikErrors, `${index}`)}
              apiError={apiErrors.find((error) => error.employeeId === projectEmployee.id)}
              isTouched={getIn(touched, `${index}`)}
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
