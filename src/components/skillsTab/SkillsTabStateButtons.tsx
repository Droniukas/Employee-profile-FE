import { Button } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleVariants } from '../../models/StyleVariants';
import { setSkillsTabState } from '../../state/skillsTabState';
import { ViewStateRoot } from '../../store/types';
import { SkillsTabState } from './models/enums/SkillsTabState';

type Props = {
  saveFunction: () => void;
  cancelFunction: () => void;
};

const SkillsTabStateButtons = (props: Props) => {
  const { saveFunction, cancelFunction } = props;
  const dispatch = useDispatch();
  const changeView = (dispatch: Dispatch<AnyAction>) => {
    dispatch(setSkillsTabState({}));
  };

  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  return (
    <>
      {viewState === SkillsTabState.VIEW_STATE && (
        <Button
          variant={StyleVariants.CONTAINED}
          onClick={() => {
            changeView(dispatch);
          }}
        >
          Edit skills
        </Button>
      )}
      {viewState === SkillsTabState.EDIT_STATE && (
        <>
          <Button variant={StyleVariants.GREY} onClick={cancelFunction}>
            Cancel
          </Button>
          <Button variant={StyleVariants.CONTAINED} onClick={saveFunction}>
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default SkillsTabStateButtons;
