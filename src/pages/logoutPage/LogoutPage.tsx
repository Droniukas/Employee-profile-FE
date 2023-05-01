import { ThemeProvider } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '../../config/theme';
import { ROUTES } from '../../routes/routes';

const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          bgcolor: 'third.main',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mt: 10,
            height: '72px',
            fontWeight: '400',
            fontSize: 32,
            fontStyle: 'Regular',
            color: 'primary.main',
            align: 'center',
          }}
        >
          You have been successfully logged out
        </Typography>
        <Button variant="contained" onClick={() => navigate(ROUTES.HOME)} sx={{ my: 1, width: 400 }}>
          Log in
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default LogoutPage;
