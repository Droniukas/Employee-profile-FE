import React, { useEffect, useState } from 'react';
import { Avatar, CssBaseline, Box, Tabs, Tab, ThemeProvider, Typography, Switch } from '@mui/material'
import Theme from '..//..//data/Theme'
import SkillsTabList from '../skills-tab/SkillsTabList';
import FindEmployee from './findEmployee/FindEmployee';
import './Main.scss';
import { Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import {ROUTES} from '../routes/routes'
import NotFound from '../../pages/NotFound';
import EmployeeResult from '../../models/EmployeeResult.interface';
import FindEmployeeResults from './findEmployee/FindEmployeeResults';
import ProfileInfo from './profileInfo/ProfileInfo';
import TabPanelProps from './TabPanelProps.interface';
import TabPanel from './TabPanel';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  
  const [value, setValue] = React.useState(0);
  // ------------Trying to fetch stuff from database so i can display the user data:

  // const [results, setResults] = useState<EmployeeResult[]>([]);

  // const getResults = async (searchValue: string) => {

  //   const result = await (await fetch(`${process.env.REACT_APP_API_URL}/employee`)).json();
  //   setResults(result);
  // };

  // getResults('j');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <ProfileInfo />
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '150px 250px 0px'}}>
          <Tabs value={location.pathname} onChange={handleChange} indicatorColor="secondary" aria-label="secondary">
            <Tab label="Skills" value={ROUTES.HOME} to={ROUTES.HOME} component={Link} {...a11yProps(0)} />
            <Tab label="Achievements" value={ROUTES.ACHIEVEMENTS} to={ROUTES.ACHIEVEMENTS} component={Link} {...a11yProps(1)} />
            <Tab label="My projects" value={ROUTES.MY_PROJECTS} to={ROUTES.MY_PROJECTS} component={Link} {...a11yProps(2)} />
            <Tab label="Search" value={ROUTES.SEARCH} to={ROUTES.SEARCH} component={Link} {...a11yProps(3)} />
            <Tab label="Project profiles" value={ROUTES.PROJECT_PROFILES} to={ROUTES.PROJECT_PROFILES} component={Link} {...a11yProps(4)} />
          </Tabs>
        </Box>
        
        <Box display='flex' justifyContent='left' alignItems='left' paddingLeft= '300px'>
          <Routes>
            <Route index path={ROUTES.HOME} element={
                  <TabPanel value={value} index={0}>
                    {/* <NavLink to={ROUTES.HOME} style={{textDecoration: 'none', boxShadow: 'none'}}>  */}
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
              <TabPanel value={value} index={3}>
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
    </>
    
  )
}

export default Main;