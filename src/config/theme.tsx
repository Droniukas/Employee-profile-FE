import { createTheme } from '@mui/material/styles';
import { checkboxClasses } from '@mui/material/Checkbox';
import viewState from '../features/viewState';
import { ViewState } from '../components/skillsTab/models/enums/ViewState';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    greyBtn: true;
  }
}

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
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'greyBtn' },
          style: {
            backgroundColor: '#F4F4F4',
            color: 'primary.main',
            marginLeft: '7px',
            marginRight: '7px',
          },
        },
      ],
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
            color: '#adaec3',
          },
        },
        checked: {},
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          height: '72px',
        },
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