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
          height: 52,
          width: '100%',
        }}
      >
        <p className="footer-paragraph copyright">Copyright © {moment().format('YYYY')} Cognizant</p>
        <p className="footer-paragraph policy">Privacy policy</p>
      </Box>
    </>
  );
};

export default Footer;
