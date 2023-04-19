import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SkillsTabFilter } from '../enums/SkillsTabFilter';

const SkillsTabFilterDropdown = () => {
  const { filter } = useParams();

  const [status, setStatus] = useState<SkillsTabFilter>(
    filter === SkillsTabFilter.ALL_SKILLS_URL ? SkillsTabFilter.ALL_SKILLS : SkillsTabFilter.MY_SKILLS,
  );

  useEffect(() => {
    setStatus(filter === SkillsTabFilter.ALL_SKILLS_URL ? SkillsTabFilter.ALL_SKILLS : SkillsTabFilter.MY_SKILLS);
  }, [filter]);

  const navigate = useNavigate();

  const onFilterValueChange = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value;
    navigate(selectedFilter === SkillsTabFilter.ALL_SKILLS ? '/skills/all' : '/skills/my');
    setStatus(event.target.value as SkillsTabFilter);
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
              value={SkillsTabFilter.ALL_SKILLS}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{SkillsTabFilter.ALL_SKILLS}</b>
            </MenuItem>
            <MenuItem
              value={SkillsTabFilter.MY_SKILLS}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{SkillsTabFilter.MY_SKILLS}</b>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default SkillsTabFilterDropdown;
