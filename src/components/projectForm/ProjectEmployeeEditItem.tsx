import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputLabel,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { ROUTES } from '../../routes/routes';
import { UserStateRoot } from '../../store/types/user';
import StatusChip from '../findEmployee/StatusChip';

type ProjectEmployeeEditItemProps = {
  projectEmployee: ProjectEmployee;
  onUpdate: (updatedProjectEmployee: ProjectEmployee) => void;
  onDelete: (projectEmployeeId: number) => void;
};

const ProjectEmployeeEditItem: React.FC<ProjectEmployeeEditItemProps> = (props: ProjectEmployeeEditItemProps) => {
  const { projectEmployee, onUpdate, onDelete } = props;
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const userId = useSelector((state: UserStateRoot) => state.userState.value).id;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const handleStartDateChange = (newValue: string) => {
    setStartDateError(null);
    if (newValue > projectEmployee.projectEmployeeEndDate) {
      onUpdate({
        ...projectEmployee,
        projectEmployeeStartDate: newValue,
        projectEmployeeEndDate: '',
      });
    } else {
      onUpdate({
        ...projectEmployee,
        projectEmployeeStartDate: newValue,
      });
    }
  };

  const handleEndDateChange = (newValue: string) => {
    onUpdate({
      ...projectEmployee,
      projectEmployeeEndDate: newValue,
    });
  };

  const handleDelete = () => {
    onDelete(projectEmployee.id);
  };

  useEffect(() => {
    projectEmployee.projectEmployeeStartDate ? setStartDateError(null) : setStartDateError('Field is required');
  }, [projectEmployee.projectEmployeeStartDate]);

  return (
    <>
      <ListItem sx={{ paddingX: 0 }}>
        <Grid container alignItems={'center'} mb={1}>
          <Grid item xs={5.5}>
            <Box display={'flex'} alignItems={'center'} mt={2.5}>
              <ListItemAvatar>
                <Avatar
                  src={`data:${projectEmployee.imageType};base64,${projectEmployee.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                    opacity: isInactiveOrDismissed(projectEmployee.status) ? 0.35 : 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                secondary={<>{projectEmployee.title}</>}
                sx={{
                  color: isInactiveOrDismissed(projectEmployee.status) ? '#666666' : 'primary.main',
                }}
              >
                <Link
                  href={
                    projectEmployee.id !== userId
                      ? `${process.env.REACT_APP_BASE_URL}/skills?employeeId=${projectEmployee.id}`
                      : `${process.env.REACT_APP_BASE_URL}${ROUTES.SKILLS}`
                  }
                  underline="hover"
                  target="_blank"
                >
                  {projectEmployee.middleName
                    ? `${projectEmployee.name} ${projectEmployee.middleName} ${projectEmployee.surname}`
                    : `${projectEmployee.name} ${projectEmployee.surname}`}
                </Link>
              </ListItemText>
            </Box>
          </Grid>
          <Grid item xs={5.5} display={'flex'}>
            <Box mr={2}>
              <InputLabel>
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 170 }}
                  format="YYYY/MM/DD"
                  value={dayjs(projectEmployee.projectEmployeeStartDate)}
                  onChange={(newValue) => {
                    if (newValue === null) return;
                    handleStartDateChange(dayjs(newValue).toISOString());
                  }}
                />
                {startDateError && (
                  <Typography sx={{ color: '#d32f2f', fontSize: 12, mt: 0.5, ml: 1.5, marginLeft: '0px' }}>
                    {startDateError}
                  </Typography>
                )}
              </LocalizationProvider>
            </Box>
            <Box>
              <InputLabel>
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 170 }}
                  format="YYYY/MM/DD"
                  minDate={dayjs(projectEmployee.projectEmployeeStartDate)}
                  value={projectEmployee.projectEmployeeEndDate ? dayjs(projectEmployee.projectEmployeeEndDate) : null}
                  onChange={(newValue) => handleEndDateChange(dayjs(newValue).toISOString())}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <IconButton
              className="btn-delete"
              aria-label="delete"
              sx={{
                color: 'primary.main',
                backgroundColor: '#F4F4F4',
              }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default ProjectEmployeeEditItem;
