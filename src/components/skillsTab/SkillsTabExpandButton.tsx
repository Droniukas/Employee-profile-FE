import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setExpandedSkill } from '../../states/expandedSkill';
import { ExpandedSkillRoot } from '../../store/types/skills';
import { StyleVariants } from '../enums/StyleVariants';

const SkillsTabExpandButton = () => {
  const expanded = useSelector((state: ExpandedSkillRoot) => state.expandedSkill.value);
  const dispatch = useDispatch();
  return (
    <Button
      variant={StyleVariants.CONTAINED}
      onClick={() => {
        dispatch(setExpandedSkill());
      }}
    >
      {expanded ? 'Collapse all' : 'Expand all'}
    </Button>
  );
};

export default SkillsTabExpandButton;
