import React from 'react'
import {Box, Typography} from '@mui/material';
import TabPanelProps from '../../models/TabPanelProps.interface';

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box sx={{p: 3}}>
                <Typography>{children}</Typography>
            </Box>
        </div>
    );
}

export default TabPanel