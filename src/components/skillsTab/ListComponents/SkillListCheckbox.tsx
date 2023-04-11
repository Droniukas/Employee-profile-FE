import { Checkbox, checkboxClasses } from '@mui/material';
import { ViewState } from '../models/enums/ViewState';
import { useSelector } from 'react-redux';
import { ViewStateRoot } from '../../../store/types';

type Props = {
  isDisabled: boolean;
  isChecked: boolean;
  onChange: () => void;
};

function SkillCheckbox({ isDisabled, isChecked, onChange }: Props) {
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  let checkboxColor;
  if (viewState == ViewState.VIEW_STATE) checkboxColor = 'adaec3';
  if (viewState == ViewState.EDIT_STATE) checkboxColor = 'primary.main';

  return (
    <>
      <Checkbox
        disabled={isDisabled}
        onChange={() => {
          onChange();
        }}
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

export default SkillCheckbox;
