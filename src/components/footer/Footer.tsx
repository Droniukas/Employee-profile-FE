import { Box } from '@mui/material';
import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <>
            <Box sx={{ position: 'fixed', backgroundColor:'#FFFFFF', zIndex: 4, bottom: 0, borderTop: 2, borderColor: 'divider', height:100, width: '100%', display:'flex'}}>
                <p className='footer copyright'>Copyright © 2023 Cognizant</p>
                <p className='footer policy'>Privacy policy</p>
            </Box>
        </>
    );
};

export default Footer;