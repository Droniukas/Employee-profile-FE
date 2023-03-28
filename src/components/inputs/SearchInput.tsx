import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    placeholder: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({placeholder, onChange}) => {
    return (
        <Box
            component="form"
            sx={{
                width: '50vw',
                justifyContent: 'flex-start',
                direction: 'column',
                alignSelf: 'flex-start',
            }}
        >
            <TextField
                sx={{
                    fontSize: '14px',
                    '& fieldset': {
                        borderRadius: 12,
                    },
                    input: {
                        color: '#000048',
                    },
                    backgroundColor:'white',
                    borderRadius: 12,
                }}
                fullWidth
                id='input-with-icon-textfield'
                placeholder={placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
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