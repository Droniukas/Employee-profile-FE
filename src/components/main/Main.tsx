import React from 'react';
import { Avatar, CssBaseline, Box, Tabs, Tab, ThemeProvider, Typography } from '@mui/material'
import Theme from '..//..//data/Theme'
import SkillsTabList from '../skills-tab/SkillsTabList';
import FindEmployee from './findEmployee/FindEmployee';

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


const Main = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
  <>
      {/* Main information about the user */}
    <Box sx={{position:'relative', padding:'150px', marginLeft: 20, paddingRight:100}}>
    <Avatar 
        alt="Cindy Baker" 
        src="https://pbs.twimg.com/media/EPGPKKfVUAABUAJ.jpg" 
        sx={{ position: 'absolute',
            width: 120,
            height: 120,
            left: '5vw',
            top: 200,
            }}/>

    <h1 style={{position:'absolute',
                height: 40,
                left: '5vw',
                top: 320,
                }}>Linus tech</h1>

    <h4 style={{position:'absolute',
                height: 20,
                left: '5vw',
                top: 375
                }}>Software Engineer at Supernova</h4>
    </Box>

    <ThemeProvider theme={Theme}>
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

        <Box display='flex' justifyContent='left' alignItems='left' paddingLeft= '300px'>
          <TabPanel value={value} index={0}>
            <SkillsTabList />
          </TabPanel>
          <TabPanel value={value} index={1} >
            Achievements
          </TabPanel>
          <TabPanel value={value} index={2}>
            My projects
          </TabPanel>
          <TabPanel value={value} index={3}>
            <FindEmployee/>
          </TabPanel>
          <TabPanel value={value} index={4}>
            Project profiles
          </TabPanel>
        </Box>
      </ThemeProvider>

  </>
  )
}

export default Main;