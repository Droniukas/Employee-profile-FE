import './Main.scss';

import { Box, CssBaseline, Tab, Tabs, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';

import theme from '../../config/theme';
import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import AchievementsTabData from '../achievementsTab/AchievementsTabData';
import FindEmployee from '../findEmployee/FindEmployee';
import ProjectProfiles from '../projectProfiles/ProjectProfiles';
import { ROUTES } from '../routes/routes';
import SkillsTabData from '../skillsTab/SkillsTabData';
import ProfileInfo from './profileInfo/ProfileInfo';
import TabPanel from './TabPanel';

const getIndexedProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const Main = () => {
  const [result, setResult] = useState<Employee>();
  const [value, setValue] = React.useState<ROUTES | number>(0);

  const employeeService = new EmployeeService();

  const getResult = async (id: string) => {
    const employee = await employeeService.getById(id);
    setResult(employee);
  };

  useEffect(() => {
    getResult(`${process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: ROUTES | number) => {
    setValue(newValue);
  };

  const [filterSearchParams, setFilterSearchParams] = useSearchParams();
  const [skillsSearchParams, setSkillsSearchParams] = useState<string | null>();
  const [achievementsSearchParams, setAchievementsSearchParams] = useState<string | null>();

  useEffect(() => {
    if (window.location.href.includes('skills')) {
      setSkillsSearchParams(filterSearchParams.get('filter'));
    } else {
      setAchievementsSearchParams(filterSearchParams.get('filter'));
    }
  });

  return (
    <>
      {result && (
        <>
          <ProfileInfo employee={result} />

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '150px 250px 0px' }}>
              <Tabs value={value} onChange={handleChange} indicatorColor="secondary" aria-label="secondary">
                <Tab
                  label="Skills"
                  to={ROUTES.SKILLS + `?filter=${skillsSearchParams ? skillsSearchParams : 'my'}`}
                  component={Link}
                  {...getIndexedProps(0)}
                />
                <Tab
                  label="Achievements"
                  to={ROUTES.ACHIEVEMENTS + `?filter=${achievementsSearchParams ? achievementsSearchParams : 'my'}`}
                  component={Link}
                  {...getIndexedProps(1)}
                />
                <Tab label="My projects" to={ROUTES.MY_PROJECTS} component={Link} {...getIndexedProps(2)} />
                {result?.isManager && (
                  <Tab
                    label="Search"
                    value={ROUTES.SEARCH}
                    to={ROUTES.SEARCH}
                    component={Link}
                    {...getIndexedProps(3)}
                  />
                )}
                {result?.isManager && (
                  <Tab label="Project profiles" to={ROUTES.PROJECT_PROFILES} component={Link} {...getIndexedProps(4)} />
                )}
              </Tabs>
            </Box>

            <Box display="flex" justifyContent="left" alignItems="left" paddingLeft="230px">
              <Routes>
                <Route
                  index
                  path={ROUTES.SKILLS}
                  element={
                    <TabPanel value={value} index={0}>
                      <SkillsTabData />
                    </TabPanel>
                  }
                />
                <Route
                  path={ROUTES.ACHIEVEMENTS}
                  element={
                    <TabPanel value={value} index={1}>
                      <AchievementsTabData />
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
                {result?.isManager && (
                  <Route
                    path={ROUTES.SEARCH}
                    element={
                      <TabPanel value={value} index={3}>
                        <FindEmployee />
                      </TabPanel>
                    }
                  />
                )}
                {result?.isManager && (
                  <Route
                    path={ROUTES.PROJECT_PROFILES}
                    element={
                      <TabPanel value={value} index={4}>
                        <ProjectProfiles />
                      </TabPanel>
                    }
                  />
                )}
              </Routes>
            </Box>
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Main;
