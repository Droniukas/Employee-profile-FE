import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';

import SearchDropdownOption from '../../models/SearchDropdownOption.interface';

type SearchDropdownProps = {
  id: string;
  placeholder: string;
  options: SearchDropdownOption[];
  noOptionsText: string;
  onChange: (values: SearchDropdownOption[]) => void;
};

const SearchDropdown: React.FC<SearchDropdownProps> = (props: SearchDropdownProps) => {
  const { id, placeholder, options, noOptionsText, onChange } = props;

  const [selectedOption, setSelectedOption] = useState<SearchDropdownOption[]>([]);
  const deleteFunctionRef = useRef({});

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChange = (event: React.SyntheticEvent, value: SearchDropdownOption[], reason: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  const updateDeleteFunctions = (value: SearchDropdownOption[], getTagProps: AutocompleteRenderGetTagProps) => {
    const deleteFunctionRefObject = {};
    value.forEach((tag, index) => {
      (deleteFunctionRefObject as Array<any>)[index] = getTagProps({ index }).onDelete;
    });
    deleteFunctionRef.current = deleteFunctionRefObject;

    return null;
  };

  const handleUnselectOption = (label: string) => {
    const index = selectedOption.findIndex((option) => option.name === label);
    (deleteFunctionRef.current as Array<any>)[index]();
  };

  interface StylePaperParams {
    children?: React.ReactNode;
  }

  const stylePaperComponents = (params: StylePaperParams) => {
    const { children } = params ?? {};

    return <Paper sx={{ color: 'primary.main' }}>{children}</Paper>;
  };

  interface RenderOptionParams {
    selected: boolean;
  }

  const handleRenderOption = (props: object, option: SearchDropdownOption, params: RenderOptionParams) => {
    const { selected } = params;

    return (
      <Box component="li" {...props} key={option.id}>
        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
        {option.name}
      </Box>
    );
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
        id={id}
        onChange={handleChange}
        options={options}
        noOptionsText={noOptionsText}
        getOptionLabel={(option) => `${option.name}`}
        groupBy={(option) => option.category}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple
        disableCloseOnSelect
        PaperComponent={stylePaperComponents}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
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
              borderRadius: 8,
            }}
          />
        )}
        renderOption={handleRenderOption}
        renderTags={updateDeleteFunctions}
      />
      {selectedOption.length > 0 ? (
        <Box
          sx={{
            mt: 0.5,
          }}
        >
          {selectedOption.map((option) => (
            <Chip
              key={option.id}
              label={option.name}
              sx={{
                mr: 0.5,
                mt: 0.25,
              }}
              onDelete={() => handleUnselectOption(option.name)}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchDropdown;
