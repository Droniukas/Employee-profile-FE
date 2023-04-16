import { styled, Switch } from '@mui/material';

import { AchievementsTabState } from '../models/enums/AchievementsTabState';
// import theme from '../../../config/theme';
export const StyledSwitch = styled(Switch)(() => ({
  width: 53,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px) translateY(5.5px)',
    '&.Mui-checked': {
      color: 'rgba(0, 0, 72, 0.4)',
      transform: 'translateX(26px) translateY(5.5px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/33/33281.png)',
        backgroundSize: '12px',
        boxShadow: '0px 2px 3px -2px black',
        borderRadius: 25,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#000048',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    // const checkboxColor = viewState == AchievementsTabState.VIEW_STATE ? 'adaec3' : 'primary.main';
    backgroundColor: AchievementsTabState.VIEW_STATE ? 'white' : 'black',
    width: 20,
    height: 20,
    '&:before': {
      boxShadow: '0px 2px 5px -2px black',
      borderRadius: 25,
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'rgba(120, 236, 232, 0.4)',
    borderRadius: 20 / 2,
  },
}));
