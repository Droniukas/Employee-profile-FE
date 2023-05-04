import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFoundPage = () => {
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
          padding: '150px',
          paddingBottom: '5px',
          paddingTop: '60px',
          borderBottom: 1,
          borderWidth: '1.2px',
          borderColor: 'divider',
        }}
        fontSize="37px"
      >
        404 Not Found
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
