import React from 'react'
import SkillsTabList from './components/skills-tab/SkillsTabList'
import { CssBaseline, Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
            color: '#adaec3',
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
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display='flex' justifyContent='center' alignItems='center'>
          <SkillsTabList />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
