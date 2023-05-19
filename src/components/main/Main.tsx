import './Main.scss';

import { Box, Button, CssBaseline, Tab, Tabs } from '@mui/material';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { Achievement } from '../../models/Achievement.interface';
import Employee from '../../models/Employee.interface';
import { Skill } from '../../models/Skill.interface';
import AccessDeniedPage from '../../pages/accessDeniedPage/AccessDeniedPage';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import { ROUTES } from '../../routes/routes';
import { EmployeeService } from '../../services/employee.service';
import { setAchievementsTabState } from '../../states/achievementsTabState';
import { setChangedAchievements } from '../../states/changedAchievements';
import { setChangedSkills } from '../../states/changedSkills';
import { triggerOnCancel } from '../../states/onCancel';
import { setSkillsTabState } from '../../states/skillsTabState';
import store from '../../store/store';
import { achievementsTabStateRoot } from '../../store/types/achievements';
import { SkillsTabStateRoot } from '../../store/types/skills';
import { UserStateRoot } from '../../store/types/user';
import AchievementsTabData from '../achievementsTab/AchievementsTabData';
import { AchievementsTabState } from '../enums/AchievementsTabState';
import { SkillsTabState } from '../enums/SkillsTabState';
import FindEmployee from '../findEmployee/FindEmployee';
import MyProjectProfiles from '../myProjects/MyProjectProfiles';
import ProjectProfiles from '../projectProfiles/ProjectProfiles';
import SkillsTabData from '../skillsTab/SkillsTabData';
import ProfileInfo from './profileInfo/ProfileInfo';
import TabPanel from './TabPanel';
import { changedAchievementsHaveDifferences, changedSkillsHaveDifferences } from './utils';

const getIndexedProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const Main = () => {
  const [result, setResult] = useState<Employee>();
  const [currentRouteValue, setCurrentRouteValue] = React.useState<ROUTES>(ROUTES.SKILLS);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [searchParams] = useSearchParams();
  const [skillsSearchParams, setSkillsSearchParams] = useState<string | null>();
  const [achievementsSearchParams, setAchievementsSearchParams] = useState<string | null>();
  const [selectedTabURL, setSelectedTabURL] = useState<string>();
  const [selectedTabValue, setSelectedTabValue] = useState<ROUTES>();
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [employeeIsFound, setEmployeeIsFound] = useState<boolean>(true);

  const skillsViewState = useSelector((state: SkillsTabStateRoot) => state.skillsTabState.value);
  const achievementsViewState = useSelector((state: achievementsTabStateRoot) => state.achievementsTabState.value);

  const employeeIdParam = searchParams.get('employeeId');

  useEffect(() => {
    setCurrentRouteValue(location.pathname as ROUTES);
  }, []);

  useEffect(() => {
    setCurrentRouteValue(location.pathname as ROUTES);
    if (window.location.href.includes('skills')) {
      setSkillsSearchParams(searchParams.get('filter'));
    } else {
      setAchievementsSearchParams(searchParams.get('filter'));
    }
  }, [searchParams]);

  const employeeService = new EmployeeService();

  const getResult = async (id: string) => {
    try {
      const employee = await employeeService.getById(id);
      setEmployeeIsFound(true);
      setResult(employee);
    } catch (error) {
      if (isAxiosError(error)) {
        if (!(error.response?.status === 401)) {
          setEmployeeIsFound(false);
          throw new Error('unknown axios error');
        } else {
          throw new Error('Unauthorized');
        }
      } else {
        throw new Error(String(error));
      }
    }
  };

  useEffect(() => {
    if (employeeIdParam) {
      getResult(employeeIdParam);
      return;
    }
    setResult(user);
    employeeHasAccess();
  }, [employeeIdParam, user]);

  const getEmployeeIdURLPart = (withOtherFilters?: boolean) => {
    if (employeeIdParam) return `${withOtherFilters ? '&' : '?'}employeeId=` + employeeIdParam;
    return '';
  };

  const createTabRoute = (tabRoute: ROUTES) => {
    if ([ROUTES.SKILLS, ROUTES.ACHIEVEMENTS].includes(tabRoute)) {
      return (
        tabRoute +
        createTabQueryParameters(tabRoute === ROUTES.SKILLS ? skillsSearchParams : achievementsSearchParams) +
        getEmployeeIdURLPart(true)
      );
    }
    return tabRoute;
  };

  const createTabQueryParameters = (searchParams: string | null | undefined) => {
    return `?filter=${searchParams ? searchParams : 'my'}`;
  };

  const routes = [
    { path: ROUTES.SKILLS },
    { path: ROUTES.ACHIEVEMENTS },
    { path: ROUTES.MY_PROJECTS },
    { path: ROUTES.SEARCH, managerOnly: true },
    { path: ROUTES.PROJECT_PROFILES, managerOnly: true },
  ];
  const routeIsFound = () => {
    if (result) return routes.find((route) => matchPath(route.path, location.pathname));
    return true;
  };

  const employeeHasAccess = () => {
    if (user !== null && !user.isManager && employeeIdParam) {
      return false;
    }
    if ((result && !result?.isManager) || employeeIdParam) {
      return !routes.some((route) => route.path === location.pathname && route.managerOnly);
    }
    return true;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skillsConfirmationDialog, setSkillsConfirmationDialog] = useState<boolean>(false);
  const [achievementsConfirmationDialog, setAchievementsConfirmationDialog] = useState<boolean>(false);

  const triggerSkillsTabCancel = () => {
    dispatch(setChangedSkills([]));
    dispatch(setSkillsTabState());
    dispatch(triggerOnCancel());
  };

  const triggerAchievementsTabCancel = () => {
    dispatch(setChangedAchievements([]));
    dispatch(setAchievementsTabState());
    dispatch(triggerOnCancel());
  };

  const handleTabClick = (currentTabURL: string, currentTabValue: ROUTES) => {
    setSelectedTabURL(currentTabURL);
    setSelectedTabValue(currentTabValue);
    const changedSkills = store.getState().changedSkills.value;
    if (changedSkillsHaveDifferences(changedSkills, skillsData)) {
      setSkillsConfirmationDialog(true);
      return;
    }
    const changedAchievements = store.getState().changedAchievements.value;
    if (changedAchievementsHaveDifferences(changedAchievements, achievementsData)) {
      setAchievementsConfirmationDialog(true);
      return;
    }
    if (skillsViewState === SkillsTabState.EDIT_STATE) {
      triggerSkillsTabCancel();
    }
    if (achievementsViewState === AchievementsTabState.EDIT_STATE) {
      triggerAchievementsTabCancel();
    }
    switchTabs(currentTabURL, currentTabValue);
  };

  const switchTabs = (currentTabURL: string, currentTabValue: ROUTES) => {
    navigate(currentTabURL);
    setCurrentRouteValue(currentTabValue);
  };

  return (
    <Box>
      {result && routeIsFound() && employeeHasAccess() && employeeIsFound && (
        <>
          <ProfileInfo employee={result} />
          <CssBaseline />
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70vw', margin: '20px 250px 0px' }}>
            <Tabs
              value={currentRouteValue}
              indicatorColor="secondary"
              aria-label="secondary"
              sx={{
                '& button': { color: 'primary.main' },
                '& button:active': { fontWeight: 'bold' },
                '& button.Mui-selected': { fontWeight: 'bold' },
              }}
            >
              <Tab
                label="Skills"
                value={ROUTES.SKILLS}
                onClick={() => handleTabClick(createTabRoute(ROUTES.SKILLS), ROUTES.SKILLS)}
                component={Button}
                {...getIndexedProps(0)}
              />
              <Tab
                label="Achievements"
                value={ROUTES.ACHIEVEMENTS}
                onClick={() => handleTabClick(createTabRoute(ROUTES.ACHIEVEMENTS), ROUTES.ACHIEVEMENTS)}
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
                    <TabPanel value={currentRouteValue} index={0}>
                      <SkillsTabData
                        confirmationDialogOpen={skillsConfirmationDialog}
                        confirmationDialogOnCancel={() => setSkillsConfirmationDialog(false)}
                        confirmationDialogOnConfirm={() => {
                          setSkillsConfirmationDialog(false);
                          if (selectedTabURL && selectedTabValue) switchTabs(selectedTabURL, selectedTabValue);
                          triggerSkillsTabCancel();
                        }}
                        skillsData={skillsData}
                        setSkillsData={setSkillsData}
                      />
                    </TabPanel>
                  }
                />
                <Route
                  path={ROUTES.ACHIEVEMENTS}
                  element={
                    <TabPanel value={currentRouteValue} index={1}>
                      <AchievementsTabData
                        confirmationDialogOpen={achievementsConfirmationDialog}
                        confirmationDialogOnCancel={() => setAchievementsConfirmationDialog(false)}
                        confirmationDialogOnConfirm={() => {
                          setAchievementsConfirmationDialog(false);
                          if (selectedTabURL && selectedTabValue) switchTabs(selectedTabURL, selectedTabValue);
                          triggerAchievementsTabCancel();
                        }}
                        achievementsData={achievementsData}
                        setAchievementsData={setAchievementsData}
                      />
                    </TabPanel>
                  }
                />
                <Route
                  path={ROUTES.MY_PROJECTS}
                  element={
                    <TabPanel value={currentRouteValue} index={2}>
                      <MyProjectProfiles />
                    </TabPanel>
                  }
                />
                {(result?.isManager && employeeIdParam) ?? (
                  <Route
                    path={ROUTES.SEARCH}
                    element={
                      <TabPanel value={currentRouteValue} index={3}>
                        <FindEmployee />
                      </TabPanel>
                    }
                  />
                )}
                {(result?.isManager && employeeIdParam) ?? (
                  <Route
                    path={ROUTES.PROJECT_PROFILES}
                    element={
                      <TabPanel value={currentRouteValue} index={4}>
                        <ProjectProfiles />
                      </TabPanel>
                    }
                  />
                )}
              </>
            </Routes>
          </Box>
        </>
      )}
      {(!routeIsFound() || !employeeIsFound) && <NotFoundPage />}
      {employeeIsFound && !employeeHasAccess() && <AccessDeniedPage />}
    </Box>
  );
};

export default Main;
