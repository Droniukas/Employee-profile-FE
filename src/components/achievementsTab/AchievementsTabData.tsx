import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AchievementsService } from '../../services/achievements.service';
import { setAchievementsTabState } from '../../state/achievementsTabState';
import { setChangedAchievements } from '../../state/changedAchievements';
import { setLoading } from '../../state/loading';
import { triggerOnCancel } from '../../state/onCancel';
import { ChangedAchievementsDataRoot } from '../../store/achievementTypes';
import AchievementsTab from './AchievementsTab';
// import { AchievementLevel } from './models/enums/AchievementLevel';
import { Achievement } from './models/interfaces/Achievement.interface';
import { ChangedAchievement } from './models/interfaces/ChangedAchievement.interface';

const AchievementsTabData = () => {
  const [achievementDataArr, setAchievementDataArr] = useState<Array<Achievement>>([]);
  const changedAchievements = useSelector((state: ChangedAchievementsDataRoot) => state.changedAchievements.value);

  const achievementsService = new AchievementsService();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setLoading(true));
    const response: Array<Achievement> = await achievementsService.fetchAchievementData();
    setAchievementDataArr(response);
    dispatch(setLoading(false));
  };

  const setErrorForAchievements = (childObj: ChangedAchievement | Achievement) => {
    const achievementWithError = achievementDataArr.find((obj) => obj.id === childObj.id);
    if (achievementWithError === undefined) throw new Error('undefined object...');
    achievementWithError.hasError = true;
    const parentObjs = achievementDataArr.filter((parentObj) => parentObj.id === achievementWithError.parentId);
    parentObjs.forEach((obj) => {
      setErrorForAchievements(obj);
    });
  };

  const hasErrors = () => {
    achievementDataArr.forEach((obj) => (obj.hasError = false));
    const unselectedStartDateAchievements = changedAchievements.filter((obj) => obj.achievementStartDate === null);
    if (unselectedStartDateAchievements.length > 0) {
      unselectedStartDateAchievements.forEach((objWithError) => {
        setErrorForAchievements(objWithError);
      });
      setAchievementDataArr([...achievementDataArr]);
      return true;
    }
  };

  const handleSave = async () => {
    // if (hasErrors()) return;
    changedAchievements.forEach(async (obj) => {
      await achievementsService.updateEmployeeAchievement(obj);
    });
    await fetchData();
    dispatch(setAchievementsTabState({}));
    dispatch(setChangedAchievements([]));
  };

  const handleCancel = async () => {
    achievementDataArr.forEach((obj) => (obj.hasError = false));
    dispatch(setChangedAchievements([]));
    await fetchData();
    dispatch(setAchievementsTabState({}));
    dispatch(triggerOnCancel({}));
  };

  return (
    <>
      {achievementDataArr ? (
        <AchievementsTab
          achievementDataArray={achievementDataArr}
          saveFunction={handleSave}
          cancelFunction={handleCancel}
        />
      ) : null}
    </>
  );
};

export default AchievementsTabData;
