import { ListItemText } from '@mui/material';
import React from 'react';

const AchievementListItemErrorText = () => {
  return (
    <ListItemText
      disableTypography
      sx={{ fontSize: 15, color: '#ef4349' }}
      primary="Achievement level should be defined for the selected achievement"
    />
  );
};

export default AchievementListItemErrorText;
