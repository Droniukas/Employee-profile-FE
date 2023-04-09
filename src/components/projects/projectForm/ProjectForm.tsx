import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  InputLabel,
  Link,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ProjectsService } from '../../../services/projects.service';
import Project from '../../../models/Project.interface';
import { Formik, FormikHelpers, FormikValues, useFormik } from 'formik';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format, toDate } from 'date-fns';
import { projectSchema } from '../../../schemas/projectSchema';
import dayjs from 'dayjs';

type Props = {
  header: string;
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
};

const ProjectForm: React.FC<Props> = ({ header, openPopup, setOpenPopup }) => {
  const projectsService = new ProjectsService();

  const [endDateExists, setEndDateExists] = useState<boolean>(false);
  const initialValues: Project = {
    title: '',
    description: '',
    startDate: null,
    endDate: null,
  };

  const handleFormSubmit = async (values: FormikValues) => {
    console.log('submitting');
    const result = await projectsService.createProject(values.toJSON());
    console.log(values.toJSON());
    console.log(result);
  };

  const handleStarDateChange = (newValue: Date | null) => {
    if (newValue === null) return;

    setFieldValue('startDate', dayjs(newValue).toJSON());
    setFieldTouched('startDate', true);
    setFieldValue('endDate', '');
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: projectSchema,
  });

  return (
    <Dialog open={openPopup} maxWidth='md'>
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button size={'small'} sx={{ width: 15, height: 30 }} onClick={() => setOpenPopup(false)}>
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
          {header}
        </Typography>
        {/* Title field input */}
        <Box>
          <Typography>{JSON.stringify(values, null, 2)}</Typography>
        </Box>
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
                  setFieldValue('startDate', dayjs(newValue).toJSON());
                  setFieldTouched('startDate', true);
                  setFieldValue('endDate', '');
                }}
                slotProps={{
                  textField: {
                    error: touched.startDate && Boolean(errors?.startDate),
                    helperText: touched.startDate && errors.startDate,
                    name: 'startDate',
                  },
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
                value={dayjs(values.endDate)}
                onChange={(newValue) => {
                  setFieldValue('endDate', dayjs(newValue).toJSON());
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

            <Link sx={{ color: '#000048' }} href='#'>
              <Typography sx={{ my: 2, fontSize: 14, fontWeight: 400, color: '#000048' }}>
                Add team member
              </Typography>
            </Link>
          </Box>
        </Box>
        {/* Cancel/save Buttons */}
        <Divider />
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button variant='contained' color='info' sx={{ m: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ m: 1 }} onClick={(e) => handleSubmit()}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProjectForm;
