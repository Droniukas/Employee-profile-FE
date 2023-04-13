import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import StatusChip from '../findEmployee/StatusChip';

type ViewEmployeeItemProps = {
  projectEmployee: ProjectEmployee;
};

const ViewEmployeeItem: React.FC<ViewEmployeeItemProps> = (props: ViewEmployeeItemProps) => {
  const { projectEmployee } = props;
  if (!projectEmployee.employee) return null;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const startDate = new Date(projectEmployee.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let endDate = 'Recent';
  if (projectEmployee.endDate) {
    endDate = new Date(projectEmployee.endDate).toLocaleDateString('en-US', {
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
                  src={`data:${projectEmployee.employee.imageType};base64,${projectEmployee.employee.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                    opacity: isInactiveOrDismissed(projectEmployee.employee.status) ? 0.35 : 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  projectEmployee.employee.middleName
                    ? `${projectEmployee.employee.name} ${projectEmployee.employee.middleName} ${projectEmployee.employee.surname}`
                    : `${projectEmployee.employee.name} ${projectEmployee.employee.surname}`
                }
                secondary={
                  <>
                    {projectEmployee.employee.title}
                    <span style={{ margin: '0 12px' }}>/</span>
                    <StatusChip status={projectEmployee.employee.status} />
                  </>
                }
                sx={{
                  color: isInactiveOrDismissed(projectEmployee.employee.status)
                    ? '#666666'
                    : '#000048',
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
              className='btn-delete'
              aria-label='delete'
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
      <Divider variant='fullWidth' component='li' />
    </>
  );
};

export default ViewEmployeeItem;
