import './ProjectForm.scss';

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
import List from '@mui/material/List';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import Employee from '../../models/Employee.interface';
import EmployeeItemState from '../../models/EmployeeItemState.interface';

type EmployeeAddListProps = {
  employees: Employee[];
};

const EmployeeAddList: React.FC<EmployeeAddListProps> = (props: EmployeeAddListProps) => {
  const { employees } = props;
  const [employeeItemState, setEmployeeItemState] = useState<EmployeeItemState[]>([]);

  const handleEmployeeItemStateChange = (
    index: number,
    newEmployeeItemState: EmployeeItemState,
  ) => {
    setEmployeeItemState((prevState) => {
      const newState = [...prevState];
      newState[index] = newEmployeeItemState;
      return newState;
    });
  };

  return (
    <List className='member-list' sx={{ marginTop: '24px' }}>
      {employees.map((employee, index) => (
        <EmployeeAddItem
          key={employee.id}
          employee={employee}
          state={employeeItemState[index]}
          onStateChange={(newEmployeeItemState: EmployeeItemState) =>
            handleEmployeeItemStateChange(index, newEmployeeItemState)
          }
        />
      ))}
    </List>
  );
};

export default EmployeeAddList;

type EmployeeAddItemProps = {
  employee: Employee;
  state: EmployeeItemState;
  onStateChange: (newEmployeeItemState: EmployeeItemState) => void;
};

const EmployeeAddItem: React.FC<EmployeeAddItemProps> = (props: EmployeeAddItemProps) => {
  const { employee, state, onStateChange } = props;

  if (!state) {
    const initialState: EmployeeItemState = {
      showDatePicker: false,
      endDateExists: false,
      startDate: dayjs().toISOString(),
      endDate: '',
    };
    onStateChange(initialState);
  }

  const handleMemberCheckboxChange = () => {
    onStateChange({
      ...state,
      showDatePicker: !state.showDatePicker,
      endDateExists: false,
    });
  };

  return (
    <>
      <ListItem sx={{ paddingY: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={5}>
            <Box display={'flex'} sx={{ alignItems: 'center' }}>
              <Checkbox
                sx={{ alignSelf: 'center', ml: -3 }}
                disableRipple
                checked={state.showDatePicker}
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
          {state.showDatePicker && (
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
                      value={dayjs(state.startDate)}
                      onChange={(newValue) => {
                        if (newValue === null) return;
                        onStateChange({
                          ...state,
                          startDate: dayjs(newValue).toISOString(),
                          endDate: dayjs(newValue).toISOString(),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box display={'flex'} sx={{ alignItems: 'center', ml: 2 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={state.endDateExists}
                      onChange={() =>
                        onStateChange({
                          ...state,
                          endDateExists: !state.endDateExists,
                        })
                      }
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                      Add member end date
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}

          {state.endDateExists && (
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
                      minDate={dayjs(state.startDate)}
                      value={state.endDate ? dayjs(state.endDate) : null}
                      onChange={(newValue) => {
                        onStateChange({
                          ...state,
                          endDate: dayjs(newValue).toISOString(),
                        });
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
