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
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import ProjectEmployeeState from '../../models/ProjectEmployeeState.interface';

type EmployeeAddListProps = {
  employees: Employee[];
  onSelect: (employees: Employee[]) => void;
};

const EmployeeAddList: React.FC<EmployeeAddListProps> = (props: EmployeeAddListProps) => {
  const { employees, onSelect } = props;
  const [employeeState, setEmployeeState] = useState<ProjectEmployeeState[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    onSelect(selectedEmployees);
  }, [onSelect, selectedEmployees]);

  const handleEmployeeItemStateChange = (index: number, state: ProjectEmployeeState) => {
    setEmployeeState((prevState) => {
      const newState = [...prevState];
      if (state.endDate < state.startDate) {
        state.endDate = state.startDate;
      }
      newState[index] = state;
      return newState;
    });

    const employeeToUpdate = { ...employees[index] };
    employeeToUpdate.projectAssignmentStartDate = state.startDate;
    employeeToUpdate.projectAssignmentEndDate = state.endDateExists ? state.endDate : '';
    const updateSelectedEmployees = selectedEmployees.filter((employee) => employee.id !== employeeToUpdate.id);
    if (state.selected && (!state.endDateExists || dayjs().isBefore(state.endDate))) {
      updateSelectedEmployees.push(employeeToUpdate);
    }
    setSelectedEmployees(updateSelectedEmployees);
  };

  const initialState: ProjectEmployeeState = {
    selected: false,
    endDateExists: false,
    startDate: dayjs().toISOString(),
    endDate: '',
  };

  return (
    <List className="member-list" sx={{ paddingTop: '24px' }}>
      {employees.map((employee, index) => (
        <EmployeeAddItem
          key={index}
          employee={employee}
          state={employeeState[index] ? employeeState[index] : initialState}
          onStateChange={(newEmployeeItemState: ProjectEmployeeState) =>
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
  state: ProjectEmployeeState;
  onStateChange: (newEmployeeItemState: ProjectEmployeeState) => void;
};

const EmployeeAddItem: React.FC<EmployeeAddItemProps> = (props: EmployeeAddItemProps) => {
  const { employee, state, onStateChange } = props;

  const handleSelectCheckboxChange = () => {
    onStateChange({
      ...state,
      selected: !state.selected,
      endDateExists: false,
    });
  };

  return (
    <>
      <ListItem sx={{ padding: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={5.5}>
            <Box display={'flex'} sx={{ alignItems: 'center' }}>
              <Checkbox
                sx={{ alignSelf: 'center', mr: 0.5 }}
                checked={state.selected}
                onChange={handleSelectCheckboxChange}
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
                }}
              />
            </Box>
          </Grid>
          {state.selected && (
            <Grid item xs={6.5}>
              <Box display={'flex'}>
                <Box>
                  <InputLabel>
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 190, pb: '14px' }}
                      format="YYYY/MM/DD"
                      value={dayjs(state.startDate)}
                      onChange={(newValue) => {
                        if (newValue === null) return;
                        onStateChange({
                          ...state,
                          startDate: dayjs(newValue).toISOString(),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box display={'flex'} sx={{ alignItems: 'center', ml: 'auto' }}>
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
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Add member end date</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}

          {state.endDateExists && (
            <>
              <Grid item xs={5.5}></Grid>
              <Grid item xs={6.5}>
                <Box>
                  <InputLabel>
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 190, mb: 4 }}
                      format="YYYY/MM/DD"
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
