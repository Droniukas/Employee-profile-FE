import './App.css'
import Login from './components/login/Login'
import {ThemeProvider} from '@mui/material/styles';
import theme from './config/theme';
import Grid from '@mui/material/Grid';
import Main from './components/main/Main';
import React, { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import LoginFooter from './components/login/LoginFooter';
import './App.scss'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {ROUTES} from './components/routes/routes'

enum AppState {
  LANDING_PAGE = 'LandingPage',
  LOGIN_PAGE = 'LoginPage'
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING_PAGE);

  return (
  <>
    {appState === AppState.LANDING_PAGE && (
      <body>
        <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' className='img'></img>
        <main>
          <Header />
            <NavLink to={ROUTES.LOGIN}>
              <Button  title='go to main' style={{position:'relative', height:100, width:100, left: 120, top: 120,  backgroundColor: '#c8e6c9'}}
              onClick={() => setAppState(AppState.LOGIN_PAGE)}>
                Go to LOGIN (TEMPORARY)</Button>
            </NavLink>
          <Main />

        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    )}
    {appState === AppState.LOGIN_PAGE && (
      <ThemeProvider theme={theme}>
            <Grid
                container sx={{
                spacing: 0,
                direction: 'column',
                alignItems: 'center',
                minHeight: '50vh',
                justifyContent: 'center'
            }}
            >
                <Login/>
                  <NavLink to={ROUTES.HOME}>
                    <Button title='go to main' style={{position:'relative', height:100, width:100, left: 120, top: 120, backgroundColor: '#c8e6c9'}}
                  onClick={() => setAppState(AppState.LANDING_PAGE)}>
                    go to MAIN (TEMPORARY)</Button>
                  </NavLink>
                  <LoginFooter/>
            </Grid>
      </ThemeProvider>
    )}
  </>
  )
}

export default App
