import './Footer.scss';

import { Box } from '@mui/material';
import moment from 'moment';
import React from 'react';

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          borderTop: 2,
          borderColor: 'divider',
          height: 64,
          width: '100%',
        }}
      >
        <p className="footer copyright">Copyright © {moment().format('YYYY')} Cognizant</p>
        <p className="footer policy">Privacy policy</p>
      </Box>
    </>
  );
};

export default Footer;
