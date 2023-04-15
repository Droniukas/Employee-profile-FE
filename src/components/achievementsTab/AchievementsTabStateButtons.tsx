import { Button } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleVariants } from '../../models/StyleVariants';
import { setAchievementsTabState } from '../../state/achievementsTabState';
import { ViewStateRoot } from '../../store/achievementTypes';
import { AchievementsTabState } from './models/enums/AchievementsTabState';

type Props = {
  saveFunction: () => void;
  cancelFunction: () => void;
};

const AchievementsTabStateButtons: React.FunctionComponent<Props> = (props) => {
  const { saveFunction, cancelFunction } = props;
  const dispatch = useDispatch();
  const changeView = (dispatch: Dispatch<AnyAction>) => {
    dispatch(setAchievementsTabState({}));
  };

  const viewState = useSelector((state: ViewStateRoot) => state.viewAchievementsState.value);
  return (
    <>
      {viewState === AchievementsTabState.VIEW_STATE && (
        <Button
          variant={StyleVariants.CONTAINED}
          onClick={() => {
            changeView(dispatch);
          }}
        >
          Edit achievements
        </Button>
      )}
      {viewState === AchievementsTabState.EDIT_STATE && (
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

export default AchievementsTabStateButtons;
