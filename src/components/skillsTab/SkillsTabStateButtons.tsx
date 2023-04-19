import { Button } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSkillsTabState } from '../../states/skillsTabState';
import { ViewStateRoot } from '../../store/types';
import { SkillsTabState } from '../enums/SkillsTabState';
import { StyleVariants } from '../enums/StyleVariants';

type Props = {
  saveFunction: () => void;
  cancelFunction: () => void;
};

const SkillsTabStateButtons: React.FunctionComponent<Props> = (props) => {
  const { saveFunction, cancelFunction } = props;
  const dispatch = useDispatch();
  const changeView = (dispatch: Dispatch<AnyAction>) => {
    dispatch(setSkillsTabState({}));
  };

  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const navigate = useNavigate();
  return (
    <>
      {viewState === SkillsTabState.VIEW_STATE && (
        <Button
          variant={StyleVariants.CONTAINED}
          onClick={() => {
            navigate('/skills/all');
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
          <Button sx={{ marginLeft: '10px' }} variant={StyleVariants.CONTAINED} onClick={saveFunction}>
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default SkillsTabStateButtons;
