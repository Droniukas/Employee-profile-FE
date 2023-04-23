import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AchievementsTabFilter } from '../enums/AchievementsTabFilter';

const AchievementsTabFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState<AchievementsTabFilter>(
    searchParams.get('filter') === AchievementsTabFilter.ALL_ACHIEVEMENTS_URL
      ? AchievementsTabFilter.ALL_ACHIEVEMENTS
      : AchievementsTabFilter.MY_ACHIEVEMENTS,
  );

  useEffect(() => {
    setStatus(
      searchParams.get('filter') === AchievementsTabFilter.ALL_ACHIEVEMENTS_URL
        ? AchievementsTabFilter.ALL_ACHIEVEMENTS
        : AchievementsTabFilter.MY_ACHIEVEMENTS,
    );
  }, [location.href]);

  const onFilterValueChange = (event: SelectChangeEvent) => {
    const selectedFilter = event.target.value;
    setSearchParams(selectedFilter === AchievementsTabFilter.ALL_ACHIEVEMENTS ? { filter: 'all' } : { filter: 'my' });
    setStatus(event.target.value as AchievementsTabFilter);
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
              value={AchievementsTabFilter.ALL_ACHIEVEMENTS}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{AchievementsTabFilter.ALL_ACHIEVEMENTS}</b>
            </MenuItem>
            <MenuItem
              value={AchievementsTabFilter.MY_ACHIEVEMENTS}
              sx={{
                color: '#000048',
                fontSize: 14,
              }}
            >
              <b>{AchievementsTabFilter.MY_ACHIEVEMENTS}</b>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default AchievementsTabFilterDropdown;
