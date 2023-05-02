import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormikHandlers } from 'formik';
import React from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';

type ProjectEmployeeEditItemProps = {
  projectEmployee: ProjectEmployee;
  index: number;
  startDateError: string;
  endDateError: string;
  errorMessage?: string;
  isTouched: boolean;
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (field: string, value: string) => void;
};

const ProjectEmployeeEditItem: React.FC<ProjectEmployeeEditItemProps> = (props: ProjectEmployeeEditItemProps) => {
  const { projectEmployee, index, startDateError, endDateError, errorMessage, isTouched, handleBlur, setFieldValue } =
    props;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const setProjectEmployeeStartDate = (newDate: string) => {
    setFieldValue(`projectEmployees.${index}.projectEmployeeStartDate`, newDate);
  };

  const setProjectEmployeeEndDate = (newDate: string) => {
    setFieldValue(`projectEmployees.${index}.projectEmployeeEndDate`, newDate);
  };

  return (
    <>
      <ListItem sx={{ paddingX: 0 }}>
        <Grid container alignItems={'center'} mb={1}>
          <Grid item xs={5.5}>
            <Box display={'flex'} alignItems={'center'} mt={2.5}>
              <ListItemAvatar>
                <Avatar
                  src={`data:${projectEmployee.imageType};base64,${projectEmployee.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                    opacity: isInactiveOrDismissed(projectEmployee.projectEmployeeStatus) ? 0.35 : 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  projectEmployee.middleName
                    ? `${projectEmployee.name} ${projectEmployee.middleName} ${projectEmployee.surname}`
                    : `${projectEmployee.name} ${projectEmployee.surname}`
                }
                secondary={projectEmployee.title}
                sx={{
                  color: isInactiveOrDismissed(projectEmployee.projectEmployeeStatus) ? '#666666' : '#000048',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5.5} display={'flex'}>
            <Box mr={2}>
              <InputLabel>
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 170 }}
                  format="YYYY/MM/DD"
                  value={
                    projectEmployee.projectEmployeeStartDate ? dayjs(projectEmployee.projectEmployeeStartDate) : null
                  }
                  onChange={(newValue) => {
                    dayjs(newValue).isValid()
                      ? setProjectEmployeeStartDate(dayjs(newValue).toISOString())
                      : setProjectEmployeeStartDate('');
                  }}
                  slotProps={{
                    textField: {
                      error: isTouched && Boolean(startDateError),
                      helperText: isTouched && startDateError,
                      onBlur: handleBlur(`projectEmployees.${index}`),
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <InputLabel>
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 170 }}
                  format="YYYY/MM/DD"
                  minDate={dayjs(projectEmployee.projectEmployeeStartDate)}
                  value={projectEmployee.projectEmployeeEndDate ? dayjs(projectEmployee.projectEmployeeEndDate) : null}
                  onChange={(newValue) => {
                    dayjs(newValue).isValid()
                      ? setProjectEmployeeEndDate(dayjs(newValue).toISOString())
                      : setProjectEmployeeEndDate('');
                  }}
                  slotProps={{
                    textField: {
                      error: isTouched && Boolean(endDateError),
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <IconButton
              className="btn-delete"
              aria-label="delete"
              sx={{
                color: '#000048',
                backgroundColor: '#F4F4F4',
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={5.5} />
          <Grid item xs={5.5}>
            {errorMessage && <Typography sx={{ color: '#d32f2f', fontSize: 14, mt: 1 }}>{errorMessage}</Typography>}
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

const ProjectEmployeeEditItemMemo = React.memo(ProjectEmployeeEditItem);

export default ProjectEmployeeEditItemMemo;
