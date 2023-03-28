import React, { useEffect, useState } from 'react';
import { Avatar, CssBaseline, Box, Tabs, Tab, ThemeProvider, Typography, Switch } from '@mui/material'
import Theme from '..//..//data/Theme'
import FindEmployee from './findEmployee/FindEmployee';
import './Main.scss';
import { Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import {ROUTES} from '../routes/routes'
import EmployeeResult from '../../models/EmployeeResult.interface';
import FindEmployeeResults from './findEmployee/FindEmployeeResults';
import ProfileInfo from './profileInfo/ProfileInfo';
import TabPanelProps from './TabPanelProps.interface';
import TabPanel from './TabPanel';
import { EmployeeService } from '../../services/employee.service';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  const [results, setResults] = useState<EmployeeResult>();
  const [value, setValue] = React.useState(0);

  const employeeService = new EmployeeService();

  const getResults = async (searchValue: string) => {
      const result = await employeeService.searchById(searchValue);
      setResults(result);
  };

  useEffect(() => {
    getResults('6979d331-027e-4a6b-8f64-1ee9bfe0ab71');
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    {results &&  <ProfileInfo  results={results}/>}
   
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
                      {/* <SkillsTabList /> */}
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
        </Box>
      </ThemeProvider>
    </>
    
  )
}

export default Main;