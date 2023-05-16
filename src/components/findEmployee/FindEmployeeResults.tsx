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
import { EmployeeStatus } from '../enums/EmployeeStatus';
import StatusChip from './StatusChip';

type FindEmployeeResultsProps = {
  employees: Employee[];
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
                opacity: employee.status === EmployeeStatus.ACTIVE ? 1 : 0.35,
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
              color: employee.status === EmployeeStatus.ACTIVE ? 'primary.main' : '#666666',
            }}
          >
            <Link
              href={
                employee.id !== userId
                  ? `${process.env.REACT_APP_BASE_URL}${ROUTES.SKILLS}?employeeId=${employee.id}`
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
