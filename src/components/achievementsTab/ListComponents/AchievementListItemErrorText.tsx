import { ListItemText } from '@mui/material';

type AchievementListItemErrorTextProps = {
  message: string;
};

const AchievementListItemErrorText = (props: AchievementListItemErrorTextProps) => {
  const { message } = props;
  return (
    <ListItemText
      disableTypography
      sx={{ fontSize: 15, color: '#ef4349', position: 'absolute' }}
      primary={message} // "The input for the start date is required"
    />
  );
};

export default AchievementListItemErrorText;
