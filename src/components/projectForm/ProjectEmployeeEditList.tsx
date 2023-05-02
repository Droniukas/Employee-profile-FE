import { Divider, List } from '@mui/material';
import { FormikErrors, FormikHandlers, FormikTouched, getIn } from 'formik';
import React from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeEditItem from './ProjectEmployeeEditItem';

type ProjectEmployeeEditListProps = {
  projectEmployees: ProjectEmployee[];
  formikErrors: FormikErrors<ProjectEmployee>;
  touched: FormikTouched<ProjectEmployee>;
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (field: string, value: string) => void;
};
const ProjectEmployeeEditList: React.FC<ProjectEmployeeEditListProps> = (props: ProjectEmployeeEditListProps) => {
  const { projectEmployees, formikErrors, touched, handleBlur, setFieldValue } = props;

  return (
    <List sx={{ marginTop: '8px' }}>
      {projectEmployees.map((projectEmployee, index) => (
        <React.Fragment key={index}>
          <ProjectEmployeeEditItem
            index={index}
            projectEmployee={projectEmployee}
            startDateError={getIn(formikErrors, `${index}.projectEmployeeStartDate`)}
            endDateError={getIn(formikErrors, `${index}.projectEmployeeEndDate`)}
            isTouched={getIn(touched, `${index}`)}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
          {index !== projectEmployees.length - 1 && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </List>
  );
};

const ProjectEmployeeEditListMemo = React.memo(ProjectEmployeeEditList);

export default ProjectEmployeeEditListMemo;
