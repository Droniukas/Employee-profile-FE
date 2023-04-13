import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setViewState } from '../../state/viewState';
import { ViewStateRoot } from '../../store/types';
import { ViewState } from './models/enums/ViewState';
import ViewButton, { StyleVariants } from './ViewButton';

type Props = {
  saveFunction: () => void;
  cancelFunction: () => void;
};

function SkillsTabStateButtons({ saveFunction, cancelFunction }: Props) {
  const dispatch = useDispatch();
  function changeView(dispatch: Dispatch<AnyAction>) {
    dispatch(setViewState({}));
  }

  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  return (
    <>
      {viewState === ViewState.VIEW_STATE && (
        <ViewButton
          text={'Edit skills'}
          styleVariant={StyleVariants.CONTAINED}
          handleClick={() => {
            changeView(dispatch);
          }}
        />
      )}
      {viewState === ViewState.EDIT_STATE && (
        <>
          <ViewButton
            text={'Cancel'}
            styleVariant={StyleVariants.GREY}
            handleClick={() => {
              cancelFunction();
            }}
          />
          <ViewButton
            text={'Save'}
            styleVariant={StyleVariants.CONTAINED}
            handleClick={() => {
              saveFunction();
            }}
          />
        </>
      )}
    </>
  );
}

export default SkillsTabStateButtons;
