import './ProjectForm.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import StatusChip from '../findEmployee/StatusChip';

type EmployeeViewListProps = {
  employees: Employee[];
};
const EmployeeViewList: React.FC<EmployeeViewListProps> = (props: EmployeeViewListProps) => {
  const { employees } = props;
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const sortedCopy = [...employees].sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return a.surname.localeCompare(b.surname, undefined, { sensitivity: 'base' });
    });
    setSortedEmployees(sortedCopy);
  }, [employees]);

  return (
    <List className="member-list" sx={{ marginTop: '8px' }}>
      {sortedEmployees.map((employee) => (
        <EmployeeItemView key={employee.id} employee={employee} />
      ))}
    </List>
  );
};
export default EmployeeViewList;

type EmployeeItemViewProps = {
  employee: Employee;
};

const EmployeeItemView: React.FC<EmployeeItemViewProps> = (props: EmployeeItemViewProps) => {
  const { employee } = props;
  if (!employee) return null;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const startDate = new Date(employee.projectAssignmentStartDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let endDate = 'Recent';
  if (employee.projectAssignmentEndDate) {
    endDate = new Date(employee.projectAssignmentEndDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const dateRange = `${startDate} - ${endDate}`;

  return (
    <>
      <ListItem sx={{ paddingX: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6}>
            <Box display={'flex'} alignItems={'center'}>
              <ListItemAvatar>
                <Avatar
                  src={`data:${employee.imageType};base64,${employee.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                    opacity: isInactiveOrDismissed(employee.status) ? 0.35 : 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  employee.middleName
                    ? `${employee.name} ${employee.middleName} ${employee.surname}`
                    : `${employee.name} ${employee.surname}`
                }
                secondary={
                  <>
                    {employee.title}
                    <span style={{ margin: '0 12px' }}>/</span>
                    <StatusChip status={employee.status} />
                  </>
                }
                sx={{
                  color: isInactiveOrDismissed(employee.status) ? '#666666' : '#000048',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
              {dateRange.replace(/(\d+ \w{3}), (\d+)/g, '$1 $2,')}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </Grid>
      </ListItem>
      <Divider variant="fullWidth" />
    </>
  );
};
