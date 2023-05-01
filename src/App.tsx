import './App.scss';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginButton/LoginButton';
import HomePage from './components/pages/homePage/HomePage';
import LogoutPage from './components/pages/logoutPage/LogoutPage';
import { ROUTES } from './components/routes/routes';
import { EmployeeService } from './services/employee.service';
import { setUserState } from './states/userState';

const App = () => {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const employeeService = new EmployeeService();
  const dispatch = useDispatch();

  useEffect(() => {
    const configureAuthenticationTokens = async () => {
      const token = await getAccessTokenSilently();
      localStorage.setItem('access_token', token);
      const identity = await getIdTokenClaims();
      const employee = await employeeService.getByEmail(identity?.email);
      console.log('emoloyee=> ', employee);
      dispatch(setUserState(employee));
    };

    if (isAuthenticated) {
      configureAuthenticationTokens();
    }
  }, [dispatch, employeeService, getAccessTokenSilently, getIdTokenClaims, isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="*" Component={withAuthenticationRequired(HomePage)} />
        <Route path={ROUTES.LOGIN} Component={LoginPage} />
        <Route path={ROUTES.LOGOUT} Component={LogoutPage} />
      </Routes>
    </>
  );
};

export default App;
