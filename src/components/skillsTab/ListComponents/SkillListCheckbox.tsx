import { Checkbox, checkboxClasses } from '@mui/material';
import { useSelector } from 'react-redux';

import { ViewStateRoot } from '../../../store/types';
import { SkillsTabState } from '../models/enums/SkillsTabState';

type Props = {
  isDisabled: boolean;
  isChecked: boolean;
  onChange: () => void;
};

function SkillListCheckbox({ isDisabled, isChecked, onChange }: Props) {
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const checkboxColor = viewState == SkillsTabState.VIEW_STATE ? 'adaec3' : 'primary.main';

  return (
    <>
      <Checkbox
        disabled={isDisabled}
        onChange={onChange}
        checked={isChecked}
        sx={{
          color: checkboxColor,
          [`&.${checkboxClasses.checked}`]: {
            color: checkboxColor,
          },
        }}
      />
    </>
  );
}

export default SkillListCheckbox;
