import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';

import SearchAchievement from '../../models/SearchAchievement.interface';
import { AchievementsService } from '../../services/achievements.service';

const SearchAchievementDropdown = () => {
  const [dropdownAchievements, setDropdownAchievements] = useState<SearchAchievement[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<SearchAchievement[]>([]);
  const deleteFunctionRef = useRef({});

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const achievementService = new AchievementsService();

  const getAchievementsCategories = async () => {
    const results = await achievementService.getAchievementsCategories();
    setDropdownAchievements(results);
  };

  useEffect(() => {
    getAchievementsCategories();
  }, []);

  const handleChange = (event: React.SyntheticEvent, value: SearchAchievement[], reason: string) => {
    setSelectedAchievements(value);
  };

  const updateDeleteFunctions = (value: SearchAchievement[], getTagProps: AutocompleteRenderGetTagProps) => {
    const deleteFunctionRefObject = {};
    value.forEach((tag, index) => {
      (deleteFunctionRefObject as Array<any>)[index] = getTagProps({ index }).onDelete;
    });
    deleteFunctionRef.current = deleteFunctionRefObject;

    return null;
  };

  const handleUnselectOption = (label: string) => {
    const index = selectedAchievements.findIndex((achievement) => achievement.achievementName === label);
    (deleteFunctionRef.current as Array<any>)[index]();
  };

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '15vw',
        justifyContent: 'flex-start',
        direction: 'column',
        alignSelf: 'flex-start',
        ml: 2,
      }}
    >
      <Autocomplete
        id="achievement-search-box"
        onChange={handleChange}
        options={dropdownAchievements}
        noOptionsText="No such achievement."
        getOptionLabel={(option) => `${option.achievementName}`}
        groupBy={(option) => option.category}
        multiple
        disableCloseOnSelect
        PaperComponent={({ children }) => <Paper style={{ color: 'primary.main' }}>{children}</Paper>}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select achievements"
            fullWidth
            sx={{
              fontSize: '14px',
              '& fieldset': {
                borderRadius: 8,
              },
              input: {
                color: 'primary.main',
              },
              backgroundColor: 'white',
            }}
          />
        )}
        renderOption={(props, option, { selected }) => {
          return (
            <Box component="li" {...props} key={option.achievementId}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.achievementName}
            </Box>
          );
        }}
        renderTags={updateDeleteFunctions}
      />
      {selectedAchievements.length > 0 ? (
        <Box
          sx={{
            mt: 0.5,
          }}
        >
          {selectedAchievements.map((achievement) => (
            <Chip
              key={achievement.achievementId}
              label={achievement.achievementName}
              sx={{
                mr: 0.5,
                mt: 0.25,
              }}
              onDelete={() => handleUnselectOption(achievement.achievementName)}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchAchievementDropdown;
