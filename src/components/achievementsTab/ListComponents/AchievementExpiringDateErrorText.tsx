import { ListItemText } from '@mui/material';

type AchievementExpiringDateErrorTextProps = {
  expiringDateErrorMessage: string;
};

const AchievementExpiringDateErrorText = (props: AchievementExpiringDateErrorTextProps) => {
  const { expiringDateErrorMessage } = props;
  return (
    <>
      <br></br>
      <ListItemText
        disableTypography
        sx={{
          fontSize: 15,
          color: '#ef4349',
          position: 'absolute',
          right: 0,
          top: '-14px',
        }}
        primary={expiringDateErrorMessage}
      />
    </>
  );
};

export default AchievementExpiringDateErrorText;
