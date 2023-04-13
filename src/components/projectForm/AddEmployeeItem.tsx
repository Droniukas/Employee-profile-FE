import {
  Avatar,
  Box,
  Checkbox,
  Grid,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import Employee from '../../models/Employee.interface';
import { projectSchema } from '../../schemas/projectSchema';

type AddEmployeeItemProps = {
  employee: Employee;
};

const AddEmployeeItem: React.FC<AddEmployeeItemProps> = (props: AddEmployeeItemProps) => {
  const { employee } = props;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(false);

  const handleMemberCheckboxChange = () => {
    setShowDatePicker(!showDatePicker);
    setEndDateExists(false);
  };

  const handleFormSubmit = () => {
    return;
  };

  const { values, setFieldValue, setFieldTouched } = useFormik({
    initialValues: {
      startDate: dayjs().toISOString(),
      endDate: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: projectSchema,
  });

  return (
    <>
      <ListItem sx={{ paddingY: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={5}>
            <Box display={'flex'} sx={{ alignItems: 'center' }}>
              <Checkbox
                sx={{ alignSelf: 'center', ml: -3 }}
                disableRipple
                onChange={handleMemberCheckboxChange}
              />
              <ListItemAvatar>
                <Avatar
                  src={`data:${employee.imageType};base64,${employee.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  employee.middleName
                    ? `${employee.name} ${employee.middleName} ${employee.surname}`
                    : `${employee.name} ${employee.surname}`
                }
                secondary={employee.title}
                sx={{
                  color: '#000048',
                  whiteSpace: 'nowrap',
                }}
              />
            </Box>
          </Grid>
          {showDatePicker && (
            <Grid item xs={7}>
              <Box display={'flex'}>
                <Box>
                  <InputLabel>
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 190, pb: '14px' }}
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
                <Box display={'flex'} sx={{ alignItems: 'center', ml: 2 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Checkbox onChange={() => setEndDateExists(!endDateExists)} />
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                      Add member end date
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}

          {endDateExists && (
            <>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Box>
                  <InputLabel>
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 190, mb: 6 }}
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
              </Grid>
            </>
          )}
        </Grid>
      </ListItem>
    </>
  );
};

export default AddEmployeeItem;
