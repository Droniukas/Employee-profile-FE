import { ListItemText } from '@mui/material';

type AchievementListItemErrorTextProps = {
  issueDateErrorMessage: string;
  expiringDateErrorMessage: string;
};

const AchievementListItemErrorText = (props: AchievementListItemErrorTextProps) => {
  const { issueDateErrorMessage, expiringDateErrorMessage } = props;
  return (
    <>
      <ListItemText
        disableTypography
        sx={{ fontSize: 15, color: '#ef4349', position: 'absolute' }}
        primary={issueDateErrorMessage}
      />
      <ListItemText
        disableTypography
        sx={{ fontSize: 15, color: '#ef4349', position: 'absolute', paddingTop: 12, paddingLeft: 67 }}
        primary={expiringDateErrorMessage}
      />
    </>
  );
};

export default AchievementListItemErrorText;
