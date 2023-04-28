import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { StyleVariants } from '../enums/StyleVariants';
import { ExpandedAchievementRoot } from '../../store/types/achievements';
import { setExpandedAchievement } from '../../states/expandedAchievement';

const AchievementsTabExpandButton = () => {
  const expanded = useSelector((state: ExpandedAchievementRoot) => state.expandedAchievement.value);
  const dispatch = useDispatch();
  return (
    <Button
      variant={StyleVariants.CONTAINED}
      onClick={() => {
        dispatch(setExpandedAchievement({}));
      }}
    >
      {expanded ? 'Collapse all' : 'Expand all'}
    </Button>
  );
};

export default AchievementsTabExpandButton;
