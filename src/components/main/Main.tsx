import './Main.scss';

import { Box, Button, CssBaseline, Tab, Tabs, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { matchPath, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import theme from '../../config/theme';
import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import store from '../../store/store';
import AchievementsTabData from '../achievementsTab/AchievementsTabData';
import FindEmployee from '../findEmployee/FindEmployee';
import ProjectProfiles from '../projectProfiles/ProjectProfiles';
import { ROUTES } from '../routes/routes';
import SkillsTabData from '../skillsTab/SkillsTabData';
import AccessDeniedPage from './AccessDeniedPage';
import NotFoundPage from './NotFoundPage';
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
  const [value, setValue] = React.useState<ROUTES>(ROUTES.SKILLS);
  useEffect(() => {
    setValue(location.pathname as ROUTES);
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [skillsSearchParams, setSkillsSearchParams] = useState<string | null>();
  const [achievementsSearchParams, setAchievementsSearchParams] = useState<string | null>();
  const employeeIdParam = searchParams.get('employeeId');
  const [allowChange, setAllowChange] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState('/' + (location.pathname + location.search).substring(1));

  useEffect(() => {
    if (window.location.href.includes('skills')) {
      setSkillsSearchParams(searchParams.get('filter'));
    } else {
      setAchievementsSearchParams(searchParams.get('filter'));
    }
  });

  const employeeService = new EmployeeService();

  const getResult = async (id: string) => {
    const employee = await employeeService.getById(id);
    setResult(employee);
  };

  useEffect(() => {
    getResult(`${employeeIdParam ? employeeIdParam : process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  // const handleChange = (event: React.SyntheticEvent, newValue: ROUTES) => {
  //   const changedSkills = store.getState().changedSkills.value;
  //   if (changedSkills.length > 0) {
  //     setAllowChange(false);
  //     setCurrentPath('/' + (location.pathname + location.search).substring(1));
  //     // open modal
  //     return;
  //   }
  //   setValue(newValue);
  //   // here we should also trigger cancel
  // };

  const getEmployeeIdURLPart = (withOtherFilters?: boolean) => {
    if (employeeIdParam) return `${withOtherFilters ? '&' : '?'}employeeId=` + employeeIdParam;
    return '';
  };

  const routes = [
    { path: ROUTES.SKILLS },
    { path: ROUTES.ACHIEVEMENTS },
    { path: ROUTES.MY_PROJECTS },
    { path: ROUTES.SEARCH, managerOnly: true },
    { path: ROUTES.PROJECT_PROFILES, managerOnly: true },
  ];
  const routeIsFound = routes.find((route) => matchPath(route.path, location.pathname));

  const employeeHasAccess = () => {
    if (!result?.isManager || employeeIdParam) {
      return !routes.some((route) => route.path === location.pathname && route.managerOnly);
    }
    return true;
  };
  // temporary
  const navigate = useNavigate();

  const handleTabClick = (tabURL: string, tabValue: ROUTES) => {
    const changedSkills = store.getState().changedSkills.value;
    if (changedSkills.length > 0) {
      return;
    }
    navigate(tabURL);
    setValue(tabValue);
  };

  return (
    <>
      {result && routeIsFound && employeeHasAccess() && (
        <>
          <ProfileInfo employee={result} />

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '150px 250px 0px' }}>
              <Tabs value={value} indicatorColor="secondary" aria-label="secondary">
                <Tab
                  label="Skills"
                  value={ROUTES.SKILLS}
                  onClick={() =>
                    handleTabClick(
                      ROUTES.SKILLS +
                        `?filter=${skillsSearchParams ? skillsSearchParams : 'my'}` +
                        getEmployeeIdURLPart(true),
                      ROUTES.SKILLS,
                    )
                  }
                  component={Button}
                  {...getIndexedProps(0)}
                />
                <Tab
                  label="Achievements"
                  value={ROUTES.ACHIEVEMENTS}
                  onClick={() =>
                    handleTabClick(
                      ROUTES.ACHIEVEMENTS +
                        `?filter=${achievementsSearchParams ? achievementsSearchParams : 'my'}` +
                        getEmployeeIdURLPart(true),
                      ROUTES.ACHIEVEMENTS,
                    )
                  }
                  component={Button}
                  {...getIndexedProps(1)}
                />
                <Tab
                  label="My projects"
                  value={ROUTES.MY_PROJECTS}
                  onClick={() => handleTabClick(ROUTES.MY_PROJECTS + getEmployeeIdURLPart(), ROUTES.MY_PROJECTS)}
                  component={Button}
                  {...getIndexedProps(2)}
                />
                {(result?.isManager && employeeIdParam) ?? (
                  <Tab
                    label="Search"
                    value={ROUTES.SEARCH}
                    onClick={() => handleTabClick(ROUTES.SEARCH, ROUTES.SEARCH)}
                    component={Button}
                    {...getIndexedProps(3)}
                  />
                )}
                {(result?.isManager && employeeIdParam) ?? (
                  <Tab
                    label="Project profiles"
                    value={ROUTES.PROJECT_PROFILES}
                    onClick={() => handleTabClick(ROUTES.PROJECT_PROFILES, ROUTES.PROJECT_PROFILES)}
                    component={Button}
                    {...getIndexedProps(4)}
                  />
                )}
              </Tabs>
            </Box>

            <Box display="flex" justifyContent="left" alignItems="left" paddingLeft="230px">
              <Routes>
                <>
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
                  {(result?.isManager && employeeIdParam) ?? (
                    <Route
                      path={ROUTES.SEARCH}
                      element={
                        <TabPanel value={value} index={3}>
                          <FindEmployee />
                        </TabPanel>
                      }
                    />
                  )}
                  {(result?.isManager && employeeIdParam) ?? (
                    <Route
                      path={ROUTES.PROJECT_PROFILES}
                      element={
                        <TabPanel value={value} index={4}>
                          <ProjectProfiles />
                        </TabPanel>
                      }
                    />
                  )}
                </>
              </Routes>
            </Box>
          </ThemeProvider>
        </>
      )}
      {
        <ThemeProvider theme={theme}>
          {!employeeHasAccess() && <AccessDeniedPage />}
          {!routeIsFound && <NotFoundPage />}
        </ThemeProvider>
      }
    </>
  );
};

export default Main;
