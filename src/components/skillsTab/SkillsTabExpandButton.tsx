import { Button } from '@mui/material';
import { StyleVariants } from '../enums/StyleVariants';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandedRoot } from '../../store/types';
import { setExpanded } from '../../states/expanded';

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
