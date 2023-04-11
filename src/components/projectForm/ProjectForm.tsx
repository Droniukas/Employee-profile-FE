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
import { useFormik } from 'formik';
import React, { useState } from 'react';

import Project from '../../models/Project.interface';
import { projectSchema } from '../../schemas/projectSchema';
import { ProjectsService } from '../../services/projects.service';
import AddMemberForm from './AddMemberForm';

type Props = {
  onClose: (projectId?: string) => void;
  project?: Project;
};

const ProjectForm: React.FC<Props> = ({ onClose, project }) => {
  const projectsService = new ProjectsService();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState<boolean>(false);

  const [endDateExists, setEndDateExists] = useState<boolean>(false);
  let initialValues: Project = {
    id: '',
    title: '',
    description: '',
    startDate: dayjs().toISOString(),
    endDate: '',
    employees: [],
  };

  const handleFormSubmit = async () => {
    let result;
    values.title.trim();
    values.description.trim();

    if (project) {
      result = await projectsService.updateProject(values);
      onClose();
    } else {
      result = await projectsService.createProject(values);
      onClose(result.id);
    }
  };

  if (project) initialValues = project;
  const {
    values,
    touched,
    errors,
    dirty,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: projectSchema,
  });

  return (
    <Dialog open={true} maxWidth='md'>
      <Dialog open={confirmationDialog} maxWidth='xl'>
        <DialogTitle>Confirm exit</DialogTitle>
        <DialogContent>
          <Typography>Changes will be lost, are you sure you want to leave?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(false)} color='error' variant='contained'>
            Cancel
          </Button>
          <Button onClick={() => onClose()} sx={{ m: 1 }} variant='contained'>
            confirm
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
          <CloseIcon fontSize='medium' />
        </Button>
      </Box>

      <Box component='form' sx={{ marginX: 5, marginY: 3 }}>
        <Typography
          variant='h1'
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
        {/* Title field input */}
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
            name={'title'}
            size='small'
            variant='outlined'
            inputProps={{ maxLength: 50 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        {/* description input */}
        <Box
          component='div'
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
            variant='outlined'
            placeholder='e.g., Give a short description about project background and expected outcome.'
            inputProps={{ maxLength: 1000 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        {/* Date input */}
        <Box display={'flex'} sx={{}}>
          <Box display={'inline-block'}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: 300 }}
                format='YYYY/MM/DD'
                value={dayjs(values.startDate)}
                onChange={(newValue) => {
                  if (newValue === null) return;
                  setFieldValue('startDate', dayjs(newValue).toISOString());
                  setFieldTouched('startDate', true);
                  setFieldValue('endDate', dayjs(newValue).toISOString());
                  setFieldTouched('endDate', true);
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            marginX={2}
            sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative', top: 12 }}
          >
            <Checkbox onChange={(e) => setEndDateExists(e.target.checked)} />
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Add end date of a project
            </Typography>
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
                format='YYYY/MM/DD'
                minDate={dayjs(values.startDate)}
                value={values.endDate ? dayjs(values.endDate) : null}
                onChange={(newValue) => {
                  setFieldValue('endDate', dayjs(newValue).toISOString());
                  setFieldTouched('endDate', true);
                }}
              />
            </LocalizationProvider>
          </Box>
        )}
        {/* Team member box */}
        <Box component='div' sx={{ my: 2 }}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Team Members</Typography>
          </InputLabel>
          <Box
            component='div'
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
              Add team members to the project to track the resources and allow your colleagues to
              follow their career within organization
            </Typography>

            <Link sx={{ color: '#000048' }} onClick={() => setShowAddMemberForm(true)}>
              <Typography sx={{ my: 2, fontSize: 14, fontWeight: 400, color: '#000048' }}>
                Add team member
              </Typography>
            </Link>
          </Box>
        </Box>
        {/* Cancel/save Buttons */}
        <Divider />
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            variant='contained'
            color='info'
            sx={{ m: 1 }}
            onClick={() => {
              dirty ? setConfirmationDialog(true) : onClose();
            }}
          >
            Cancel
          </Button>
          <Button sx={{ m: 1 }} variant='contained' onClick={handleFormSubmit}>
            Save
          </Button>
        </Box>
      </Box>
      {showAddMemberForm && project && <AddMemberForm project={project} />}
    </Dialog>   
  );
};

export default ProjectForm;
