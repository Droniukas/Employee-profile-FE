import React from 'react';
import { Avatar, CssBaseline, Box, Tabs, Tab, ThemeProvider, Typography } from '@mui/material'
import Theme from '..//..//data/Theme'
import SkillsTabList from '../skills-tab/SkillsTabList';
import FindEmployee from './findEmployee/FindEmployee';
import './Main.scss';
import user from '../../data/user/user.json';
import { Routes, Route } from 'react-router-dom';
import {ROUTES} from '../routes/routes'
import NotFound from '../../pages/NotFound';

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

// const PageChoosing = React.lazy(() => import('../../pages/tabChoosing/TabChoosing.jsx'));


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
        src={user.image} 
        sx={{ position: 'absolute',
            width: 120,
            height: 120,
            left: '5vw',
            top: 200,
            }}/>
    <h1 className='name'>{user.name} {user.middle_name} {user.surname}</h1>
    <h4 className='position'>{user.title_id}</h4>
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
          <Routes>
            <Route index element={
                      <TabPanel value={value} index={0}>
                        <SkillsTabList />
                      </TabPanel>
              } />

            <Route path={ROUTES.ACHIEVEMENTS} element={
              <TabPanel value={value} index={1} >
                 Achievements
              </TabPanel>
              } />

            <Route path={ROUTES.MY_PROJECTS} element={
              <TabPanel value={value} index={2} >
                 My projects
              </TabPanel>
              } />

            <Route path={ROUTES.SEARCH} element={
              <TabPanel value={value} index={3} >
                 <FindEmployee/>
              </TabPanel>
              } />

            <Route path={ROUTES.PROJECT_PROFILES} element={
              <TabPanel value={value} index={4} >
                 Project profiles
              </TabPanel>
              } />
            </Routes> 
            {/* <Route path='/*' element={<NotFound />} /> */}
        </Box>
        </ThemeProvider>


  


          {/* <TabPanel value={value} index={0}>
          
            <SkillsTabList />
          </TabPanel> */}
          {/* <Route path={ROUTES.ACHIEVEMENTS} element={
            <Box display='flex' justifyContent='left' alignItems='left' paddingLeft= '300px'>
                      <TabPanel value={value} index={1} >
            Achievements
          </TabPanel>
          </Box>
          } /> */}

{/* <Route path={ROUTES.MY_PROJECTS} element={
         <TabPanel value={value} index={2}>
            My projects
          </TabPanel>
} />
<Route path={ROUTES.SEARCH} element={
          <TabPanel value={value} index={3}>
            <FindEmployee/>
          </TabPanel>
} />
<Route path={ROUTES.PROJECT_PROFILES} element={
          <TabPanel value={value} index={4}>
            Project profiles
          </TabPanel>
} />
        </Box> */}

    </>
    
  )
}

export default Main;