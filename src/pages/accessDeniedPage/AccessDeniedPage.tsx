import { Box, Typography } from '@mui/material';
import React from 'react';

const AccessDeniedPage = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          borderBottom: 1,
          padding: '150px',
          paddingBottom: '5px',
          paddingTop: '60px',
          borderColor: 'divider',
          borderWidth: '1.2px',
        }}
        fontSize="37px"
      >
        Access denied
      </Typography>
      <Typography marginTop="20px" color="grey">
        You do not have permission to access this page.
        <br /> Please contact your Site Administrator{'(s)'} to request access.
      </Typography>
    </Box>
  );
};

export default AccessDeniedPage;
