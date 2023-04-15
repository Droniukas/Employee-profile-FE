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
  results: Employee[];
};

const FindEmployeeResults: React.FC<FindEmployeeResultsProps> = (props: FindEmployeeResultsProps) => {
  const { results } = props;

  if (!results) return null;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const renderResultItem = (result: Employee) => {
    return (
      <>
        <ListItem key={result.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              src={`data:${result.imageType};base64,${result.imageBytes}`}
              sx={{
                border: '0.01px solid lightgrey',
                opacity: isInactiveOrDismissed(result.status) ? 0.35 : 1,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              result.middleName
                ? `${result.name} ${result.middleName} ${result.surname}`
                : `${result.name} ${result.surname}`
            }
            secondary={
              <>
                {result.title}
                <span style={{ margin: '0 12px' }}>/</span>
                <StatusChip status={result.status} />
              </>
            }
            sx={{
              color: isInactiveOrDismissed(result.status) ? '#666666' : '#000048',
            }}
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
      </>
    );
  };

  return (
    <>
      <List sx={{ width: '100%' }}>{results.map((result) => renderResultItem(result))}</List>
    </>
  );
};

export default FindEmployeeResults;
