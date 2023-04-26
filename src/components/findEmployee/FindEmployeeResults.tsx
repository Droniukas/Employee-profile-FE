import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import Employee from '../../models/Employee.interface';
import StatusChip from './StatusChip';

type FindEmployeeResultsProps = {
  employees: Employee[];
};

export const isInactiveOrDismissed = (status: string): boolean => {
  return ['INACTIVE', 'DISMISSED'].includes(status);
};

const FindEmployeeResults: React.FC<FindEmployeeResultsProps> = (props: FindEmployeeResultsProps) => {
  const { employees } = props;

  if (!employees) return null;

  const renderResultItem = (employee: Employee) => {
    return (
      <div key={employee.id}>
        <ListItem alignItems="flex-start">
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
          >
            <Link
              href={
                employee.id.toString() !== `${process.env.REACT_APP_TEMP_USER_ID}`
                  ? `http://localhost:3000/skills?employeeId=${employee.id}`
                  : 'http://localhost:3000/skills?filter=my'
              }
              underline="hover"
              target="_blank"
            >
              {employee.middleName
                ? `${employee.name} ${employee.middleName} ${employee.surname}`
                : `${employee.name} ${employee.surname}`}
            </Link>
          </ListItemText>
        </ListItem>
        <Divider variant="fullWidth" component="li" />
      </div>
    );
  };

  return (
    <>
      <List sx={{ width: '100%' }}>{employees.map((employee) => renderResultItem(employee))}</List>
    </>
  );
};

export default FindEmployeeResults;
