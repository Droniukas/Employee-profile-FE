import React from 'react';
import './Footer.scss';
import {Box} from '@mui/material';

const Footer = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: 'white',
                clear: 'both',
                zIndex: 4,
                bottom: 0,
                borderTop: 2,
                borderColor: 'divider',
                height: 100,
                width: '100%',
                display: 'flex'
            }}>
                <p className='footer copyright'>Copyright © 2023 Cognizant</p>
                <p className='footer policy'>Privacy policy</p>
            </Box>
        </>
    );
};

export default Footer;