import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { ProjectStatus } from '../enums/ProjectStatus';

type ProjectFilterProps = {
  onFilterValueSelection: (filterValue: string) => void;
};

const ProjectFilter: React.FC<ProjectFilterProps> = (props: ProjectFilterProps) => {
  const { onFilterValueSelection } = props;

  const [status, setStatus] = React.useState('All');

  const onFilterValueChange = (event: SelectChangeEvent) => {
    onFilterValueSelection(event.target.value);
    setStatus(event.target.value as string);
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        position: 'relative',
        left: 0,
      }}
    >
      <Typography
        sx={{
          color: '#000048',
          fontSize: 14,
        }}
      >
        Show:
      </Typography>
      <Box
        className="filter-area"
        sx={{
          position: 'relative',
          left: 10,
        }}
      >
        <FormControl variant="standard">
          <Select
            id="status-filter"
            value={status}
            onChange={onFilterValueChange}
            disableUnderline
            sx={{
              color: '#000048',
              fontSize: 14,
            }}
          >
            <MenuItem
              value="All"
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>All projects</b>
            </MenuItem>
            <MenuItem
              value={ProjectStatus.ONGOING}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{ProjectStatus.ONGOING}</b>
            </MenuItem>
            <MenuItem
              value={ProjectStatus.FINISHED}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{ProjectStatus.FINISHED}</b>
            </MenuItem>
            <MenuItem
              value={ProjectStatus.FUTURE}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{ProjectStatus.FUTURE}</b>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ProjectFilter;
