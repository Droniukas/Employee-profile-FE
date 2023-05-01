import './App.scss';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import LogoutPage from './pages/logoutPage/LogoutPage';
import { ROUTES } from './routes/routes';
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
      dispatch(setUserState(employee));
    };

    if (isAuthenticated) {
      configureAuthenticationTokens();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

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
