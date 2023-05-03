import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setExpandedAchievement } from '../../states/expandedAchievement';
import { ExpandedAchievementRoot } from '../../store/types/achievements';
import { StyleVariants } from '../enums/StyleVariants';

const AchievementsTabExpandButton = () => {
  const expanded = useSelector((state: ExpandedAchievementRoot) => state.expandedAchievement.value);
  const dispatch = useDispatch();
  return (
    <Button
      variant={StyleVariants.CONTAINED}
      onClick={() => {
        dispatch(setExpandedAchievement());
      }}
    >
      {expanded ? 'Collapse all' : 'Expand all'}
    </Button>
  );
};

export default AchievementsTabExpandButton;
