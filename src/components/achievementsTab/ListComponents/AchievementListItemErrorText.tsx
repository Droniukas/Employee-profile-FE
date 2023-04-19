import { ListItemText } from '@mui/material';
import React from 'react';

const AchievementListItemErrorText = () => {
  return (
    <ListItemText
      disableTypography
      sx={{ fontSize: 15, color: '#ef4349' }}
      primary="The input for the start date is required"
    />
  );
};

export default AchievementListItemErrorText;
