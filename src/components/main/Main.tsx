import './Main.scss';

import { Box, CssBaseline, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';

import Employee from '../../models/Employee.interface';
import { ROUTES } from '../../routes/routes';
import { EmployeeService } from '../../services/employee.service';
import { UserStateRoot } from '../../store/types/user';
import AchievementsTabData from '../achievementsTab/AchievementsTabData';
import FindEmployee from '../findEmployee/FindEmployee';
import ProjectProfiles from '../projectProfiles/ProjectProfiles';
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
  const [value, setValue] = React.useState<ROUTES>(ROUTES.SKILLS);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [searchParams, setSearchParams] = useSearchParams();
  const [skillsSearchParams, setSkillsSearchParams] = useState<string | null>();
  const [achievementsSearchParams, setAchievementsSearchParams] = useState<string | null>();
  const employeeIdParam = searchParams.get('employeeId');

  useEffect(() => {
    setValue(location.pathname as ROUTES);
    if (window.location.href.includes('skills')) {
      setSkillsSearchParams(searchParams.get('filter'));
    } else {
      setAchievementsSearchParams(searchParams.get('filter'));
    }
  }, []);

  const employeeService = new EmployeeService();

  const getResult = async (id: string) => {
    const employee = await employeeService.getById(id);
    setResult(employee);
  };

  useEffect(() => {
    setResult(user);
    if (employeeIdParam) {
      getResult(employeeIdParam);
    }
  }, [employeeIdParam, user]);

  const handleChange = (event: React.SyntheticEvent, newValue: ROUTES) => {
    setValue(newValue);
  };

  const getEmployeeIdURLPart = (withOtherFilters?: boolean) => {
    if (employeeIdParam) return `${withOtherFilters ? '&' : '?'}employeeId=` + employeeIdParam;
    return '';
  };

  return (
    <>
      {result && (
        <>
          <ProfileInfo employee={result} />
          <CssBaseline />
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '60vw', margin: '150px 250px 0px' }}>
            <Tabs value={value} onChange={handleChange} indicatorColor="secondary" aria-label="secondary">
              <Tab
                label="Skills"
                value={ROUTES.SKILLS}
                to={
                  ROUTES.SKILLS +
                  `?filter=${skillsSearchParams ? skillsSearchParams : 'my'}` +
                  getEmployeeIdURLPart(true)
                }
                component={Link}
                {...getIndexedProps(0)}
              />
              <Tab
                label="Achievements"
                value={ROUTES.ACHIEVEMENTS}
                to={
                  ROUTES.ACHIEVEMENTS +
                  `?filter=${achievementsSearchParams ? achievementsSearchParams : 'my'}` +
                  getEmployeeIdURLPart(true)
                }
                component={Link}
                {...getIndexedProps(1)}
              />
              <Tab
                label="My projects"
                value={ROUTES.MY_PROJECTS}
                to={ROUTES.MY_PROJECTS + getEmployeeIdURLPart()}
                component={Link}
                {...getIndexedProps(2)}
              />
              {(result?.isManager && employeeIdParam) ?? (
                <Tab label="Search" value={ROUTES.SEARCH} to={ROUTES.SEARCH} component={Link} {...getIndexedProps(3)} />
              )}
              {(result?.isManager && employeeIdParam) ?? (
                <Tab
                  label="Project profiles"
                  value={ROUTES.PROJECT_PROFILES}
                  to={ROUTES.PROJECT_PROFILES}
                  component={Link}
                  {...getIndexedProps(4)}
                />
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
            </Routes>
          </Box>
        </>
      )}
    </>
  );
};

export default Main;
