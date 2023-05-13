import './ProjectForm.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Checkbox, Dialog, Divider, InputLabel, Link, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { FormikErrors, getIn, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';

import Project from '../../models/Project.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeError from '../../models/ProjectEmployeeError.interface';
import { projectSchema } from '../../schemas/projectSchema';
import { ProjectsService } from '../../services/projects.service';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import ProjectEmployeeAddForm from './ProjectEmployeeAddForm';
import ProjectEmployeeEditList from './ProjectEmployeeEditList';

type ProjectFormProps = {
  onClose: (projectId?: number) => void;
  project?: Project;
};

const ProjectForm: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
  const { onClose, project } = props;

  const projectsService = new ProjectsService();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [showAddEmployeesForm, setShowAddEmployeesForm] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(project?.endDate ? true : false);

  const [projectEmployeeApiErrors, setProjectEmployeeApiErrors] = useState<ProjectEmployeeError[]>([]);

  let initialValues: Project = {
    title: '',
    description: '',
    startDate: dayjs().startOf('day').toString(),
    endDate: '',
    projectEmployees: [],
    status: '',
  };
  if (project) initialValues = project;

  const handleFormSubmit = async () => {
    let result;
    values.title.trim();
    values.description.trim();

    try {
      if (project) {
        result = await projectsService.updateProject(values);
        onClose();
      } else {
        result = await projectsService.createProject(values);
        onClose(result.id);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response && error.response.status === 400) {
        const projectEmployeeApiErrors = (error as AxiosError).response?.data as ProjectEmployeeError[];
        setProjectEmployeeApiErrors(projectEmployeeApiErrors);
      }
    }
  };

  const projectForm = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: projectSchema,
    validateOnChange: false,
  });

  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    setTouched,
    handleSubmit,
  } = projectForm;

  const handleAddEmployeesFormClose = () => {
    setShowAddEmployeesForm(false);
  };

  const sortProjectEmployees = (projectEmployees: ProjectEmployee[]) => {
    const sortedProjectEmployees = projectEmployees.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return a.surname.localeCompare(b.surname, undefined, { sensitivity: 'base' });
    });
    return sortedProjectEmployees;
  };

  const handleAddClick = (newProjectEmployees: ProjectEmployee[]) => {
    const sortedProjectEmployees = sortProjectEmployees([...values.projectEmployees, ...newProjectEmployees]);
    const newTouched = { projectEmployees: Array(sortedProjectEmployees.length).fill(false) };

    values.projectEmployees.forEach((projectEmployee, index) => {
      const newIndex = sortedProjectEmployees.findIndex((pe) => pe.id === projectEmployee.id);
      if (newIndex !== -1) {
        newTouched.projectEmployees[newIndex] = touched.projectEmployees?.[index];
      }
    });

    setTouched(newTouched);
    setFieldValue('projectEmployees', sortedProjectEmployees, true);
  };

  const deleteProjectEmployee = useCallback(
    (index: number) => {
      const newTouched = {
        ...touched,
        projectEmployees: touched.projectEmployees?.filter((_, idx) => idx !== index),
      };

      const newProjectEmployees = [
        ...values.projectEmployees.slice(0, index),
        ...values.projectEmployees.slice(index + 1),
      ];

      setTouched(newTouched);
      setFieldValue('projectEmployees', newProjectEmployees, true);
    },
    [values.projectEmployees, touched, setFieldValue, setTouched],
  );

  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      setTimeout(() => {
        element.classList.add('field-error');
      }, 100);
      element.classList.remove('field-error');
    }
  };

  useEffect(() => {
    if (isSubmitting && errors) {
      const firstElementWithErrorId = Object.keys(errors)[0];
      if (firstElementWithErrorId === 'projectEmployees') {
        const projectEmployeeErrors = errors.projectEmployees as FormikErrors<ProjectEmployee>[];
        const firstErrorIndex = projectEmployeeErrors.findIndex((error) => error !== undefined);
        focusElement(`projectEmployees${values.projectEmployees[firstErrorIndex].id}`);
      } else {
        focusElement(firstElementWithErrorId);
      }
    }
  }, [isSubmitting, errors, values.projectEmployees]);

  useEffect(() => {
    if (projectEmployeeApiErrors.length > 0) {
      focusElement(`projectEmployees${projectEmployeeApiErrors[0].employeeId}`);
    }
  }, [projectEmployeeApiErrors]);

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <ConfirmationDialog
        open={confirmationDialog}
        onCancel={() => setConfirmationDialog(false)}
        onConfirm={() => onClose()}
      />

      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button
          sx={{ width: 15, height: 30 }}
          onClick={() => {
            dirty ? setConfirmationDialog(true) : onClose();
          }}
        >
          <CloseIcon fontSize="medium" />
        </Button>
      </Box>

      <Box component="form" sx={{ marginX: 5, marginTop: 3 }}>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontWeight: 400,
            fontSize: 25,
            fontStyle: 'Regular',
            color: 'primary.main',
          }}
        >
          {project ? 'Edit project profile' : 'Add project profile'}
        </Typography>
        <Box>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Project title</Typography>
          </InputLabel>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            size="small"
            variant="outlined"
            name={'title'}
            id={'title'}
            inputProps={{ maxLength: 50 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            my: 2,
          }}
        >
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Description</Typography>
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            name={'description'}
            id={'description'}
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            placeholder="e.g., Give a short description about project background and expected outcome."
            inputProps={{ maxLength: 1000 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: 0,
              },
              '& textarea': {
                padding: 2,
              },
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Box display={'flex'}>
          <Box display={'inline-block'}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box id={'startDate'}>
                <DatePicker
                  sx={{
                    width: 170,
                    '& .MuiInputBase-input': {
                      height: 10,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: 2,
                    },
                  }}
                  format="YYYY/MM/DD"
                  value={values.startDate ? dayjs(values.startDate) : null}
                  onChange={(newValue) => setFieldValue('startDate', newValue?.toString())}
                  slotProps={{
                    textField: {
                      error: Boolean(errors.startDate),
                      onBlur: () => setFieldTouched('startDate'),
                    },
                    popper: {
                      onBlur: () => setFieldTouched('startDate'),
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Box>
          <Box marginX={2} sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative', top: 12 }}>
            <Checkbox
              checked={endDateExists}
              onChange={(e) => {
                setEndDateExists(e.target.checked);
                setFieldValue('endDate', '', true);
              }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Add end date of a project</Typography>
          </Box>
        </Box>
        <Typography sx={{ color: '#D32F2F', fontSize: 12, width: 170, mt: 0.4 }}>{errors.startDate}</Typography>
        {endDateExists && (
          <Box sx={{ my: 2 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box id={'endDate'} width={170}>
                <DatePicker
                  sx={{
                    width: 170,
                    '& .MuiInputBase-input': {
                      height: 10,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: 2,
                    },
                  }}
                  format="YYYY/MM/DD"
                  minDate={dayjs(values.startDate)}
                  value={values.endDate ? dayjs(values.endDate) : null}
                  onChange={(newValue) => setFieldValue('endDate', newValue?.toString())}
                  slotProps={{
                    textField: {
                      error: Boolean(errors.endDate),
                      onBlur: () => setFieldTouched('endDate'),
                    },
                    popper: {
                      onBlur: () => setFieldTouched('endDate'),
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
            <Typography sx={{ color: '#D32F2F', fontSize: 12, mt: 0.4 }}>{errors.endDate}</Typography>
          </Box>
        )}
        {/* Team member box */}
        <Box component="div" sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Team Members</Typography>
            </InputLabel>
            {values.projectEmployees.length > 0 && (
              <Link
                component="button"
                sx={{ marginLeft: 'auto', color: 'primary.main' }}
                onClick={(event) => {
                  setShowAddEmployeesForm(true);
                  event.preventDefault();
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: 'primary.main' }}>Add team member</Typography>
              </Link>
            )}
          </Box>

          {values.projectEmployees.length > 0 ? (
            <ProjectEmployeeEditList
              projectEmployees={values.projectEmployees}
              formikErrors={getIn(errors, 'projectEmployees')}
              apiErrors={projectEmployeeApiErrors}
              touched={getIn(touched, 'projectEmployees')}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              deleteProjectEmployee={deleteProjectEmployee}
            />
          ) : (
            <Box
              component="div"
              height={200}
              sx={{
                backgroundColor: '#ededed',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ my: 1, fontSize: 20, fontWeight: 600, color: 'primary.main' }}>
                No team members yet
              </Typography>

              <Typography
                sx={{
                  marginX: 10,
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#4f4f4f',
                  textAlign: 'center',
                }}
              >
                Add team members to the project to track the resources and allow your colleagues to follow their career
                within organization
              </Typography>

              <Link
                component="button"
                sx={{ color: 'primary.main' }}
                onClick={(event) => {
                  setShowAddEmployeesForm(true);
                  event.preventDefault();
                }}
              >
                <Typography sx={{ my: 2, fontSize: 14, fontWeight: 400, color: 'primary.main' }}>
                  Add team member
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
      {showAddEmployeesForm && (
        <ProjectEmployeeAddForm
          projectEmployees={values.projectEmployees}
          onClose={handleAddEmployeesFormClose}
          onAdd={handleAddClick}
        />
      )}
      {/* Cancel/save Buttons */}
      <Divider />
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="info"
          sx={{ m: 1 }}
          onClick={() => {
            dirty ? setConfirmationDialog(true) : onClose();
          }}
        >
          Cancel
        </Button>
        <Button sx={{ m: 1 }} variant="contained" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default ProjectForm;
