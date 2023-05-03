import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useSelector } from 'react-redux';

import Employee from '../../models/Employee.interface';
import { ROUTES } from '../../routes/routes';
import { UserStateRoot } from '../../store/types/user';
import StatusChip from './StatusChip';

type FindEmployeeResultsProps = {
  employees: Employee[];
};

export const isInactiveOrDismissed = (status: string): boolean => {
  return ['INACTIVE', 'DISMISSED'].includes(status);
};

const FindEmployeeResults: React.FC<FindEmployeeResultsProps> = (props: FindEmployeeResultsProps) => {
  const { employees } = props;
  const userId = useSelector((state: UserStateRoot) => state.userState.value).id;

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
              color: isInactiveOrDismissed(employee.status) ? '#666666' : 'primary.main',
            }}
          >
            <Link
              href={
                employee.id !== userId
                  ? `${process.env.REACT_APP_BASE_URL}/skills?employeeId=${employee.id}`
                  : `${process.env.REACT_APP_BASE_URL}${ROUTES.SKILLS}`
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
