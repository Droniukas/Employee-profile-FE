import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Achievement } from '../../models/Achievement.interface';
import { ChangedAchievement } from '../../models/ChangedAchievement.interface';
import { AchievementsService } from '../../services/achievements.service';
import { setAchievementsTabState } from '../../states/achievementsTabState';
import { setChangedAchievements } from '../../states/changedAchievements';
import { triggerOnCancel } from '../../states/onCancel';
import store from '../../store/store';
import AchievementsTab from './AchievementsTab';
import { getAchievementsDataWithCount, getFilteredAchievementsData } from './utils';
import dayjs from 'dayjs';

const AchievementsTabData = () => {
  const [achievementsData, setAchievementsData] = useState<Array<Achievement>>([]);
  const achievementsService = new AchievementsService();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAndFilterAchievementsData();
  }, [location.href]);

  const fetchAndFilterAchievementsData = async () => {
    const response: Achievement[] = await achievementsService.fetchAchievementsData();
    setAchievementsData(
      getFilteredAchievementsData(getAchievementsDataWithCount(response), searchParams.get('filter')),
    );
  };

  const setErrorForAchievements = (childAchievement: ChangedAchievement | Achievement) => {
    const achievementWithError = achievementsData.find(
      (achievement) => achievement.achievementId === childAchievement.achievementId,
    );
    if (achievementWithError === undefined) throw new Error('undefined object...');
    achievementWithError.hasError = true;
    const parentAchievements = achievementsData.filter(
      (parentAchievement) => parentAchievement.achievementId === achievementWithError.parentAchievementId,
    );
    parentAchievements.forEach((achievement) => {
      setErrorForAchievements(achievement);
    });
  };

  const hasErrors = () => {
    const changedAchievements = store.getState().changedAchievements.value;
    achievementsData.forEach((achievement) => (achievement.hasError = false));
    const unselectedLevelAchievements = changedAchievements.filter(
      (achievement) =>
        ((achievement.issueDate === null || achievement.issueDate === undefined) && achievement.checked === true) ||
        (achievement.issueDate !== null &&
          achievement.issueDate !== undefined &&
          achievement.checked === true &&
          achievement.expiringDate !== null &&
          achievement.expiringDate !== undefined &&
          dayjs(achievement.expiringDate).isBefore(dayjs(achievement.issueDate))),
    );
    if (unselectedLevelAchievements.length > 0) {
      unselectedLevelAchievements.forEach((changedAchievementWithError) => {
        setErrorForAchievements(changedAchievementWithError);
      });
      setAchievementsData([...achievementsData]);
      return true;
    }
  };

  const handleSave = async () => {
    const changedAchievements = store.getState().changedAchievements.value;
    if (hasErrors()) return;
    await achievementsService.updateEmployeeAchievements(changedAchievements);
    await fetchAndFilterAchievementsData();
    dispatch(setAchievementsTabState({}));
    dispatch(setChangedAchievements([]));
  };

  const handleCancel = async () => {
    achievementsData.forEach((achievement) => (achievement.hasError = false));
    await fetchAndFilterAchievementsData();
    dispatch(setChangedAchievements([]));
    dispatch(setAchievementsTabState({}));
    dispatch(triggerOnCancel({}));
  };

  return (
    <>
      {achievementsData ? (
        <AchievementsTab achievementsData={achievementsData} saveFunction={handleSave} cancelFunction={handleCancel} />
      ) : null}
    </>
  );
};

export default AchievementsTabData;
