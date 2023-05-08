import { ListItemText } from '@mui/material';

type AchievementListItemErrorTextProps = {
  issueDateErrorMessage: string;
  expiringDateErrorMessage: string;
};

const AchievementListItemErrorText = (props: AchievementListItemErrorTextProps) => {
  const { issueDateErrorMessage, expiringDateErrorMessage } = props;
  return (
    <>
      <br></br>
      <ListItemText
        disableTypography
        sx={{
          fontSize: 15,
          color: '#ef4349',
          position: 'absolute',
          // right: '0px',
          // backgroundColor: 'yellow',
          top: '-14px',
          right: '375px',
          // display: 'inline',
        }}
        primary={issueDateErrorMessage}
      />
      <ListItemText
        disableTypography
        sx={{
          fontSize: 15,
          color: '#ef4349',
          position: 'absolute',
          // paddingTop: 13,
          // paddingLeft: 67,
          right: 0,
          top: '-14px',
        }}
        primary={expiringDateErrorMessage}
      />
    </>
  );
};

export default AchievementListItemErrorText;
