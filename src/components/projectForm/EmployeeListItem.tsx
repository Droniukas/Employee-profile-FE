import React, { useState } from 'react';
import Employee from '../../models/Employee.interface';
import {
  ListItem,
  Box,
  Checkbox,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputLabel,
  Typography,
  Grid,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type EmployeeListItemProps = {
  employee: Employee;
};

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee }) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowDatePicker(event.target.checked);
  };

  return (
    <>
      <ListItem sx={{ paddingY: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={5}>
            <Box display={'flex'} sx={{ alignItems: 'center' }}>
              <Checkbox
                sx={{ alignSelf: 'center', ml: -3 }}
                edge='start'
                disableRipple
                onChange={handleCheckboxChange}
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
                    <DatePicker sx={{ width: 190, pb: '14px' }} format='YYYY/MM/DD' />
                  </LocalizationProvider>
                </Box>
                <Box display={'flex'} sx={{ alignItems: 'center' }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Checkbox disableRipple onChange={(e) => setEndDateExists(e.target.checked)} />
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                      Add end date of a member
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
                    <DatePicker sx={{ width: 190, mb: 6 }} format='YYYY/MM/DD' />
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

export default EmployeeListItem;
