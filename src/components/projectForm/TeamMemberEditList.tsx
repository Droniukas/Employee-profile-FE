import './ProjectForm.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import ProjectEmployee from '../../models/ProjectEmployee.interface';
import StatusChip from '../findEmployee/StatusChip';

type TeamMemberEditListProps = {
  teamMembers: ProjectEmployee[];
  updateTeamMember: (updatedTeamMember: ProjectEmployee) => void;
};
const TeamMemberEditList: React.FC<TeamMemberEditListProps> = (props: TeamMemberEditListProps) => {
  const { teamMembers, updateTeamMember } = props;
  const [sortedTeamMembers, setSortedTeamMembers] = useState<ProjectEmployee[]>([]);

  useEffect(() => {
    const sortedCopy = [...teamMembers].sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return a.surname.localeCompare(b.surname, undefined, { sensitivity: 'base' });
    });
    setSortedTeamMembers(sortedCopy);
  }, [teamMembers]);

  const handleTeamMemberStateChange = (updatedTeamMember: ProjectEmployee) => {
    updateTeamMember(updatedTeamMember);
  };

  return (
    <List className="member-list" sx={{ marginTop: '8px' }}>
      {sortedTeamMembers.map((teamMember, index) => (
        <React.Fragment key={teamMember.id}>
          <TeamMemberEditItem teamMember={teamMember} onUpdate={handleTeamMemberStateChange} />
          {index !== sortedTeamMembers.length - 1 && <Divider variant="fullWidth" />}
        </React.Fragment>
      ))}
    </List>
  );
};
export default TeamMemberEditList;

type TeamMemberEditItemProps = {
  teamMember: ProjectEmployee;
  onUpdate: (updatedTeamMember: ProjectEmployee) => void;
};

const TeamMemberEditItem: React.FC<TeamMemberEditItemProps> = (props: TeamMemberEditItemProps) => {
  const { teamMember, onUpdate } = props;
  const [startDateError, setStartDateError] = useState<string | null>(null);

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const handleStartDateChange = (teamMemberStartDate: string) => {
    setStartDateError(null);
    if (teamMemberStartDate > teamMember.teamMemberEndDate) {
      onUpdate({
        ...teamMember,
        teamMemberStartDate,
        teamMemberEndDate: '',
      });
    } else {
      onUpdate({
        ...teamMember,
        teamMemberStartDate,
      });
    }
  };

  const handleEndDateChange = (teamMemberEndDate: string) => {
    onUpdate({
      ...teamMember,
      teamMemberEndDate,
    });
  };

  useEffect(() => {
    teamMember.teamMemberStartDate ? setStartDateError(null) : setStartDateError('Field is required');
  }, [teamMember.teamMemberStartDate]);

  return (
    <>
      <ListItem sx={{ paddingX: 0 }}>
        <Grid container alignItems={'center'} mb={1}>
          <Grid item xs={5.5}>
            <Box display={'flex'} alignItems={'center'} mt={2.5}>
              <ListItemAvatar>
                <Avatar
                  src={`data:${teamMember.imageType};base64,${teamMember.imageBytes}`}
                  sx={{
                    border: '0.01px solid lightgrey',
                    opacity: isInactiveOrDismissed(teamMember.status) ? 0.35 : 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  teamMember.middleName
                    ? `${teamMember.name} ${teamMember.middleName} ${teamMember.surname}`
                    : `${teamMember.name} ${teamMember.surname}`
                }
                secondary={
                  <>
                    {teamMember.title}
                    <span style={{ margin: '0 12px' }}>/</span>
                    <StatusChip status={teamMember.status} />
                  </>
                }
                sx={{
                  color: isInactiveOrDismissed(teamMember.status) ? '#666666' : '#000048',
                }}
              />
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
                  value={dayjs(teamMember.teamMemberStartDate)}
                  onChange={(newValue) => {
                    if (newValue === null) return;
                    handleStartDateChange(dayjs(newValue).toISOString());
                  }}
                />
                {startDateError && (
                  <Typography sx={{ color: '#d32f2f', fontSize: 12, mt: 0.5, ml: 1.5 }}>{startDateError}</Typography>
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
                  minDate={dayjs(teamMember.teamMemberStartDate)}
                  value={teamMember.teamMemberEndDate ? dayjs(teamMember.teamMemberEndDate) : null}
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
                color: '#000048',
                backgroundColor: '#F4F4F4',
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};
