import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormikContext, getIn, useFormik } from 'formik';
import React, { useState } from 'react';

import Project from '../../models/Project.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import ProjectEmployeeError from '../../models/ProjectEmployeeError.interface';
import { projectSchema } from '../../schemas/projectSchema';
import { ProjectsService } from '../../services/projects.service';
import ProjectEmployeeAddForm from './ProjectEmployeeAddForm';
import ProjectEmployeeEditList from './ProjectEmployeeEditList';
import { AxiosError } from 'axios';

type ProjectFormProps = {
  onClose: (projectId?: string) => void;
  project?: Project;
};

const ProjectForm: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
  const { onClose, project } = props;

  const projectsService = new ProjectsService();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [showAddEmployeesForm, setShowAddEmployeesForm] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(project?.endDate ? true : false);
  const [projectEmployeeErrors, setProjectEmployeeErrors] = useState<ProjectEmployeeError[]>([]);

  let initialValues: Project = {
    id: '',
    title: '',
    description: '',
    startDate: dayjs().toISOString(),
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
      setProjectEmployeeErrors((error as AxiosError).response?.data as ProjectEmployeeError[]);
    }
  };

  const projectForm = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: projectSchema,
  });

  const {
    values,
    touched,
    errors,
    dirty,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    setTouched,
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
      const isTouched = touched.projectEmployees?.[index] ? true : false;
      const newIndex = sortedProjectEmployees.findIndex((pe) => pe.id === projectEmployee.id);
      if (newIndex !== -1) {
        newTouched.projectEmployees[newIndex] = isTouched;
      }
    });

    setTouched(newTouched);
    setFieldValue('projectEmployees', sortedProjectEmployees);
  };

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <Dialog open={confirmationDialog} maxWidth="xl">
        <DialogTitle>Confirm exit</DialogTitle>
        <DialogContent>
          <Typography>Changes will be lost, are you sure you want to leave?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(false)} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={() => onClose()} sx={{ m: 1 }} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            placeholder="e.g., Give a short description about project background and expected outcome."
            inputProps={{ maxLength: 1000 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Box display={'flex'} sx={{}}>
          <Box display={'inline-block'}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: 300 }}
                format="YYYY/MM/DD"
                value={dayjs(values.startDate)}
                onChange={(newValue) => {
                  if (newValue === null) return;
                  setFieldValue('startDate', dayjs(newValue).toISOString());
                  setFieldTouched('startDate', true);
                  setFieldValue('endDate', '');
                  setFieldTouched('endDate', true);
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box marginX={2} sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative', top: 12 }}>
            <Checkbox
              checked={endDateExists}
              onChange={(e) => {
                setEndDateExists(e.target.checked);
                setFieldValue('endDate', '');
              }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Add end date of a project</Typography>
          </Box>
        </Box>
        {endDateExists && (
          <Box sx={{ my: 2 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: 300 }}
                format="YYYY/MM/DD"
                minDate={dayjs(values.startDate)}
                value={values.endDate ? dayjs(values.endDate) : null}
                onChange={(newValue) => setFieldValue('endDate', dayjs(newValue).toISOString())}
              />
            </LocalizationProvider>
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
                sx={{ marginLeft: 'auto', color: '#000048' }}
                onClick={(event) => {
                  setShowAddEmployeesForm(true);
                  event.preventDefault();
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#000048' }}>Add team member</Typography>
              </Link>
            )}
          </Box>

          {values.projectEmployees.length > 0 ? (
            <FormikContext.Provider value={projectForm}>
              <ProjectEmployeeEditList
                projectEmployees={values.projectEmployees}
                formikErrors={getIn(errors, 'projectEmployees')}
                errors={projectEmployeeErrors}
                touched={getIn(touched, 'projectEmployees')}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </FormikContext.Provider>
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
              <Typography sx={{ my: 1, fontSize: 20, fontWeight: 600, color: '#000048' }}>
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
                sx={{ color: '#000048' }}
                onClick={(event) => {
                  setShowAddEmployeesForm(true);
                  event.preventDefault();
                }}
              >
                <Typography sx={{ my: 2, fontSize: 14, fontWeight: 400, color: '#000048' }}>Add team member</Typography>
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
