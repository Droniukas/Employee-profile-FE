import './ProjectForm.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Checkbox,
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

import TeamMember from '../../models/TeamMember.interface';
import StatusChip from '../findEmployee/StatusChip';

type TeamMemberEditListProps = {
  teamMembers: TeamMember[];
  updateTeamMember: (updatedTeamMember: TeamMember) => void;
};
const TeamMemberEditList: React.FC<TeamMemberEditListProps> = (props: TeamMemberEditListProps) => {
  const { teamMembers, updateTeamMember } = props;
  const [sortedTeamMembers, setSortedTeamMembers] = useState<TeamMember[]>([]);

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

  const handleTeamMemberStateChange = (updatedTeamMember: TeamMember) => {
    updateTeamMember(updatedTeamMember);
  };

  return (
    <List className="member-list" sx={{ marginTop: '8px' }}>
      {sortedTeamMembers.map((teamMember) => (
        <TeamMemberEditItem key={teamMember.id} teamMember={teamMember} onUpdate={handleTeamMemberStateChange} />
      ))}
    </List>
  );
};
export default TeamMemberEditList;

type TeamMemberEditItemProps = {
  teamMember: TeamMember;
  onUpdate: (updatedTeamMember: TeamMember) => void;
};

const TeamMemberEditItem: React.FC<TeamMemberEditItemProps> = (props: TeamMemberEditItemProps) => {
  const { teamMember, onUpdate } = props;
  const [endDateExists, setEndDateExists] = useState<boolean>(false);

  const startDate = new Date(teamMember.teamMemberStartDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let endDate = 'Recent';
  if (teamMember.teamMemberEndDate) {
    endDate = new Date(teamMember.teamMemberEndDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const dateRange = `${startDate} - ${endDate}`;

  const isInactiveOrDismissed = (status: string): boolean => {
    return ['INACTIVE', 'DISMISSED'].includes(status);
  };

  const handleStartDateChange = (teamMemberStartDate: string) => {
    onUpdate({
      ...teamMember,
      teamMemberStartDate,
    });
  };

  const handleEndDateChange = (teamMemberEndDate: string) => {
    onUpdate({
      ...teamMember,
      teamMemberEndDate,
    });
  };

  return (
    <>
      <ListItem sx={{ paddingX: 0 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6}>
            <Box display={'flex'} alignItems={'center'}>
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
          <Grid item xs={4}>
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
              {dateRange.replace(/(\d+ \w{3}), (\d+)/g, '$1 $2,')}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      <Box display={'flex'}>
        <Box>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Start Date</Typography>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: 300, pb: '14px' }}
              format="YYYY/MM/DD"
              value={dayjs(teamMember.teamMemberStartDate)}
              onChange={(newValue) => handleStartDateChange(dayjs(newValue).toISOString())}
            />
          </LocalizationProvider>
        </Box>
        <Box display={'flex'} sx={{ alignItems: 'center', ml: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Checkbox
              onChange={(e) => {
                setEndDateExists(e.target.checked);
                handleEndDateChange('');
              }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Add member end date</Typography>
          </Box>
        </Box>
      </Box>
      {endDateExists && (
        <Box>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>End Date</Typography>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: 300, mb: 4 }}
              format="YYYY/MM/DD"
              minDate={dayjs(teamMember.teamMemberStartDate)}
              value={teamMember.teamMemberEndDate ? dayjs(teamMember.teamMemberEndDate) : null}
              onChange={(newValue) => handleEndDateChange(dayjs(newValue).toISOString())}
            />
          </LocalizationProvider>
        </Box>
      )}
      <Divider variant="fullWidth" />
    </>
  );
};
