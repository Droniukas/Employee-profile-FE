import { ListItemText } from '@mui/material';

const AchievementListItemErrorText = () => {
  return (
    <ListItemText
      disableTypography
      sx={{ fontSize: 15, color: '#ef4349', position: 'absolute' }}
      primary="The input for the start date is required"
    />
  );
};

export default AchievementListItemErrorText;
