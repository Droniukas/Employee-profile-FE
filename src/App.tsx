import './App.css';
import './App.scss';

import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import LoginFooter from './components/login/LoginFooter';
import Main from './components/main/Main';
import TabPanel from './components/main/TabPanel';
import theme from './config/theme';

export enum AppState {
  LANDING_PAGE = 'LandingPage',
  LOGIN_PAGE = 'LoginPage',
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN_PAGE);
  const handleAppStateChange = (newState: AppState) => {
    setAppState(newState);
  };

  return (
    <>
      {appState === AppState.LANDING_PAGE && (
        <body>
          <main>
            <Header />
            <img src="https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png" alt="" className="img"></img>
            <TabPanel index={0} value={0} />
            <Main />
            <footer>
              <Footer />
            </footer>
          </main>
        </body>
      )}
      {appState === AppState.LOGIN_PAGE && (
        <ThemeProvider theme={theme}>
          <Grid
            container
            sx={{
              spacing: 0,
              direction: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Login setAppState={handleAppStateChange} />
          </Grid>
          <LoginFooter />
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
