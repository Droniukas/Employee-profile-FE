import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';

type Props = {
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<Props> = ({ placeholder, onChange }) => {
  return (
    <Box
      component='form'
      sx={{
        width: '40vw',
        justifyContent: 'flex-start',
        direction: 'column',
        alignSelf: 'flex-start',
      }}
    >
      <TextField
        sx={{
          fontSize: '14px',
          '& fieldset': {
            borderRadius: 8,
          },
          input: {
            color: '#000048',
          },
          backgroundColor: 'white',
        }}
        fullWidth
        id='input-with-icon-textfield'
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
};

export default SearchInput;
