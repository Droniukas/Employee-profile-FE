import { Button } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { setAchievementsTabState } from '../../states/achievementsTabState';
import { ViewAchievementStateRoot } from '../../store/achievementTypes';
import { AchievementsTabState } from '../enums/AchievementsTabState';
import { StyleVariants } from '../enums/StyleVariants';

type AchievementsTabStateButtonsProps = {
  saveFunction: () => void;
  cancelFunction: () => void;
};

const AchievementsTabStateButtons: React.FunctionComponent<AchievementsTabStateButtonsProps> = (props) => {
  const { saveFunction, cancelFunction } = props;
  const dispatch = useDispatch();
  const changeView = (dispatch: Dispatch<AnyAction>) => {
    dispatch(setAchievementsTabState({}));
  };

  const viewState = useSelector((state: ViewAchievementStateRoot) => state.viewAchievementsState.value);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      {viewState === AchievementsTabState.VIEW_STATE && (
        <Button
          variant={StyleVariants.CONTAINED}
          onClick={() => {
            navigate('/achievements');
            setSearchParams({ filter: 'all' });
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
          <Button sx={{ marginLeft: '10px' }} variant={StyleVariants.CONTAINED} onClick={saveFunction}>
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default AchievementsTabStateButtons;
