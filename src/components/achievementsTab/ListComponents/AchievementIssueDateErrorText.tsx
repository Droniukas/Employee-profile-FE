import { ListItemText } from '@mui/material';

const AchievementIssueDateErrorText = () => {
  return (
    <>
      <br></br>
      <ListItemText
        disableTypography
        sx={{
          fontSize: 15,
          color: '#ef4349',
          position: 'absolute',
          top: '-14px',
          right: '375px',
        }}
        primary={'Field is required'}
      />
    </>
  );
};

export default AchievementIssueDateErrorText;
