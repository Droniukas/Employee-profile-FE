import React, { useState } from 'react';
import EmployeeResult from '../../models/EmployeeResult.interface';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { TablePagination } from '@mui/material';

type Props = {
  results: EmployeeResult[];
};

const FindEmployeeResults: React.FC<Props> = ({ results }) => {
  if (!results) return null;


  const renderResultItem = (result: EmployeeResult) => {
    return (
      <>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar src={`data:${result.imageType};base64,${result.imageBytes}`} />
          </ListItemAvatar>
          <ListItemText
            primary={
              result.middleName
                ? `${result.name} ${result.middleName} ${result.surname}`
                : `${result.name} ${result.surname}`
            }
            secondary={<React.Fragment>{result.title}</React.Fragment>}
            sx={{
              color: '#000048',
            }}
          />
        </ListItem>
        <Divider variant='fullWidth' component='li' />
      </>
    );
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
        }}
      >
        {results.map((result) => renderResultItem(result))}
      </List>
    </>
  );
};

export default FindEmployeeResults;
