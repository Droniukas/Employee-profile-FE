import { createTheme } from '@mui/material/styles'
import { checkboxClasses } from '@mui/material/Checkbox'

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontSize: 14,
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  palette: {
    primary: {
      main: '#000048',
    },
    secondary: {
      main: '#78ECE8',
    },
    info: {
      main: '#F4F4F4',
      contrastText: '#000048',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#adaec3',
          [`&.${checkboxClasses.checked}`]: {
            color: '#000048',
          },
        },
        checked: {},
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: '2px',
        },
      },
    },
  },
});

export default theme;