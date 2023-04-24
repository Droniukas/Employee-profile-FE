import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setExpanded } from '../../states/expanded';
import { StyleVariants } from '../enums/StyleVariants';
import { ExpandedRoot } from '../../store/types/skills';

const SkillsTabExpandButton = () => {
  const expanded = useSelector((state: ExpandedRoot) => state.expanded.value);
  const dispatch = useDispatch();
  return (
    <Button
      variant={StyleVariants.CONTAINED}
      onClick={() => {
        dispatch(setExpanded({}));
      }}
    >
      {expanded ? 'Collapse all' : 'Expand all'}
    </Button>
  );
};

export default SkillsTabExpandButton;
