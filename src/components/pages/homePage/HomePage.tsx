import './HomePage.scss';

import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Main from '../../main/Main';
import TabPanel from '../../main/TabPanel';
import { ROUTES } from '../../routes/routes';

const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(ROUTES.LOGIN);
  }, []);

  return (
    <main>
      <Header />
      <img src="https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png" alt="" className="img"></img>
      <TabPanel index={0} value={0} />
      <Main />
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
