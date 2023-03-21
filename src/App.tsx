import React from 'react'
import SkillsTabList from './components/skills-tab/SkillsTabList'
import { CssBaseline, Box, Tabs, Tab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { checkboxClasses } from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}





function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '150px 250px 0px'}}>
          <Tabs value={value} onChange={handleChange} indicatorColor="secondary" aria-label="secondary">
            <Tab label="Skills"           {...a11yProps(0)} />
            <Tab label="Achievements"     {...a11yProps(1)} />
            <Tab label="My projects"      {...a11yProps(2)} />
            <Tab label="Search"           {...a11yProps(3)} />
            <Tab label="Project profiles" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <Box display='flex' justifyContent='center' alignItems='center'>
        <TabPanel value={value} index={0}>
          <SkillsTabList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Achievements
        </TabPanel>
        <TabPanel value={value} index={2}>
          My projects
        </TabPanel>
        <TabPanel value={value} index={3}>
          Search
        </TabPanel>
        <TabPanel value={value} index={4}>
          Project profiles
        </TabPanel>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
