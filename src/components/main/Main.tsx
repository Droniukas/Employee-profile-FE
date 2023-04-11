import './Main.scss';

import { Box, CssBaseline, Tab, Tabs, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Theme from '../../config/theme';
import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import FindEmployee from '../findEmployee/FindEmployee';
import ProjectProfiles from '../projectProfiles/ProjectProfiles';
import { ROUTES } from '../routes/routes';
import ProfileInfo from './profileInfo/ProfileInfo';
import TabPanel from './TabPanel';

function getIndexedProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  const [results, setResults] = useState<Employee>();
  const [value, setValue] = React.useState(0);

  const employeeService = new EmployeeService();

  const getResults = async (id: string) => {
    const result = await employeeService.getById(id);
    setResults(result);
  };

  useEffect(() => {
    getResults(`${process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {results && <ProfileInfo results={results} />}

      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '150px 250px 0px' }}>
          <Tabs value={location.pathname} onChange={handleChange} indicatorColor="secondary" aria-label="secondary">
            <Tab label="Skills" value={ROUTES.HOME} to={ROUTES.HOME} component={Link} {...getIndexedProps(0)} />
            <Tab
              label="Achievements"
              value={ROUTES.ACHIEVEMENTS}
              to={ROUTES.ACHIEVEMENTS}
              component={Link}
              {...getIndexedProps(1)}
            />
            <Tab
              label="My projects"
              value={ROUTES.MY_PROJECTS}
              to={ROUTES.MY_PROJECTS}
              component={Link}
              {...getIndexedProps(2)}
            />
            <Tab label="Search" value={ROUTES.SEARCH} to={ROUTES.SEARCH} component={Link} {...getIndexedProps(3)} />
            <Tab
              label="Project profiles"
              value={ROUTES.PROJECT_PROFILES}
              to={ROUTES.PROJECT_PROFILES}
              component={Link}
              {...getIndexedProps(4)}
            />
          </Tabs>
        </Box>

        <Box display="flex" justifyContent="left" alignItems="left" paddingLeft="230px">
          <Routes>
            <Route
              index
              path={ROUTES.HOME}
              element={
                <TabPanel value={value} index={0}>
                  Skills
                </TabPanel>
              }
            />

            <Route
              path={ROUTES.ACHIEVEMENTS}
              element={
                <TabPanel value={value} index={1}>
                  Achievements
                </TabPanel>
              }
            />

            <Route
              path={ROUTES.MY_PROJECTS}
              element={
                <TabPanel value={value} index={2}>
                  My projects
                </TabPanel>
              }
            />

            <Route
              path={ROUTES.SEARCH}
              element={
                <TabPanel value={value} index={3}>
                  <FindEmployee />
                </TabPanel>
              }
            />

            <Route
              path={ROUTES.PROJECT_PROFILES}
              element={
                <TabPanel value={value} index={4}>
                  <ProjectProfiles />
                </TabPanel>
              }
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Main;
