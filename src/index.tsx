import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import theme from './config/theme';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Auth0Provider
            domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`}
            clientId={`${process.env.REACT_APP_AUTH0_CLIENT_ID}`}
            authorizationParams={{
              audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
              redirect_uri: window.location.origin,
            }}
          >
            <App />
          </Auth0Provider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
);
