import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../routes/routes';

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) loginWithRedirect();
  else navigate(ROUTES.SKILLS);

  return <div>Logging in...</div>;
};

export default LoginPage;
