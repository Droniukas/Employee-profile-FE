import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Checkbox, Dialog, Divider, InputLabel, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import MyProject from '../../models/MyProject.interface';
import { responsibilitiesSchema } from '../../schemas/myResponsibilitySchema';
import { ProjectsService } from '../../services/projects.service';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';

type ProjectFormProps = {
  onClose: (projectId?: number) => void;
  myProject: MyProject;
};

const MyProjectEdit: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
  const { onClose, myProject } = props;

  const projectsService = new ProjectsService();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(myProject?.endDate ? true : false);

  let initialValues: MyProject = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    projectEmployeeStartDate: dayjs().toISOString(),
    projectEmployeeEndDate: '',
    responsibilities: '',
    status: '',
  };
  if (myProject) initialValues = myProject;

  const handleFormSubmit = async () => {
    let result;
    values.responsibilities.trim();

    try {
      result = await projectsService.updateProject2(values);
      onClose();
    } catch (error: unknown) {
      /* empty */
    }
  };

  const projectForm = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: responsibilitiesSchema,
  });

  const { values, touched, errors, dirty, handleBlur, handleChange, setFieldValue, setFieldTouched, handleSubmit } =
    projectForm;

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
          {myProject ? 'Edit project profile' : 'Add project profile'}
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
            value={values.responsibilities}
            onBlur={handleBlur}
            error={touched.responsibilities && Boolean(errors.responsibilities)}
            helperText={touched.responsibilities && errors.responsibilities}
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
          <TextField
            hiddenLabel
            variant="standard"
            value={values.responsibilities}
            placeholder="Enter responsibilities..."
            sx={{ color: 'primary.main' }}
          />
        </Box>
        <Box display={'flex'} sx={{}}>
          <Box display={'inline-block'}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: 170,
                  '& .MuiInputBase-input': {
                    height: 10,
                  },
                }}
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
                sx={{
                  width: 170,
                  '& .MuiInputBase-input': {
                    height: 10,
                  },
                }}
                format="YYYY/MM/DD"
                minDate={dayjs(values.startDate)}
                value={values.endDate ? dayjs(values.endDate) : null}
                onChange={(newValue) => setFieldValue('endDate', dayjs(newValue).toISOString())}
              />
            </LocalizationProvider>
          </Box>
        )}
        {/* Team member box */}
      </Box>
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

export default MyProjectEdit;
