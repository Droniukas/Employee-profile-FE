import { Box } from '@mui/material';
import React from 'react';

import TabPanelProps from '../../models/TabPanelProps.interface';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
};

export default TabPanel;
