import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';

import SearchSkill from '../../models/SearchSkill.interface';
import { SkillsService } from '../../services/skills.service';

const SearchSkillDropdown = () => {
  const [dropdownSkills, setDropdownSkills] = useState<SearchSkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SearchSkill[]>([]);
  const deleteFunctionRef = useRef({});

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const skillService = new SkillsService();

  const getSkillsCategories = async () => {
    const results = await skillService.getSkillsCategories();
    setDropdownSkills(results);
  };

  useEffect(() => {
    getSkillsCategories();
  }, []);

  const handleChange = (event: React.SyntheticEvent, value: SearchSkill[], reason: string) => {
    setSelectedSkills(value);
  };

  const updateDeleteFunctions = (value: SearchSkill[], getTagProps: AutocompleteRenderGetTagProps) => {
    const deleteFunctionRefObject = {};
    value.forEach((tag, index) => {
      (deleteFunctionRefObject as Array<any>)[index] = getTagProps({ index }).onDelete;
    });
    deleteFunctionRef.current = deleteFunctionRefObject;

    return null;
  };

  const handleUnselectOption = (label: string) => {
    const index = selectedSkills.findIndex((skill) => skill.skillName === label);
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
        id="skill-search-box"
        onChange={handleChange}
        options={dropdownSkills}
        noOptionsText="No such skill."
        getOptionLabel={(option) => `${option.skillName}`}
        groupBy={(option) => option.category}
        multiple
        disableCloseOnSelect
        PaperComponent={({ children }) => <Paper style={{ color: 'primary.main' }}>{children}</Paper>}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select skills"
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
            <Box component="li" {...props} key={option.skillId}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.skillName}
            </Box>
          );
        }}
        renderTags={updateDeleteFunctions}
      />
      {selectedSkills.length > 0 ? (
        <Box
          sx={{
            mt: 0.5,
          }}
        >
          {selectedSkills.map((skill) => (
            <Chip
              key={skill.skillId}
              label={skill.skillName}
              sx={{
                mr: 0.5,
                mt: 0.25,
              }}
              onDelete={() => handleUnselectOption(skill.skillName)}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchSkillDropdown;
