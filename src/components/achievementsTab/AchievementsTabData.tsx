import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Achievement } from '../../models/Achievement.interface';
import { ChangedAchievement } from '../../models/ChangedAchievement.interface';
import { AchievementsService } from '../../services/achievements.service';
import { setAchievementsTabState } from '../../states/achievementsTabState';
import { setChangedAchievements } from '../../states/changedAchievements';
import { triggerOnCancel } from '../../states/onCancel';
import store from '../../store/store';
import { AchievementWithErrorIdRoot } from '../../store/types/achievements';
import { UserStateRoot } from '../../store/types/user';
import AchievementsTab from './AchievementsTab';
import { getAchievementsDataWithCount, getFilteredAchievementsData } from './utils';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import CustomSnackbar from '../customSnackbar/CustomSnackbar';

type AchievementsTabDataProps = {
  confirmationDialogOpen: boolean;
  confirmationDialogOnCancel: () => void;
  confirmationDialogOnConfirm: () => void;
  achievementsData: Achievement[];
  setAchievementsData: React.Dispatch<React.SetStateAction<Achievement[]>>;
};

const AchievementsTabData: React.FunctionComponent<AchievementsTabDataProps> = (props) => {
  const {
    confirmationDialogOnCancel,
    confirmationDialogOnConfirm,
    confirmationDialogOpen,
    achievementsData,
    setAchievementsData,
  } = props;
  const achievementsService = new AchievementsService();
  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');
  const userId = useSelector((state: UserStateRoot) => state.userState.value).id;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();

  const achievementWithErrorId = useSelector((state: AchievementWithErrorIdRoot) => state.achievementWithErrorId.value);
  useEffect(() => {
    setErrorForAchievementById(achievementWithErrorId.achievementId);
    setAchievementsData([...achievementsData]);
  }, [achievementWithErrorId]);
  const setErrorForAchievementById = (childAchievementId: number) => {
    const achievementWithError: Achievement | undefined = achievementsData.find(
      (achievement) => achievement.achievementId === childAchievementId,
    );
    if (achievementWithError === undefined) return;
    achievementWithError.hasError = false;
    const parentAchievements = achievementsData.filter(
      (parentAchievement) => parentAchievement.achievementId === achievementWithError.parentAchievementId,
    );
    parentAchievements.forEach((achievement) => {
      setErrorForAchievementById(achievement.achievementId);
    });
  };

  const fetchAndFilterAchievementsData = async () => {
    if (employeeIdParam) {
      const response: Achievement[] = await achievementsService.fetchAchievementsDataByEmployeeId(
        Number(employeeIdParam),
      );
      setAchievementsData(getFilteredAchievementsData(getAchievementsDataWithCount(response), 'my'));
    } else {
      const response: Achievement[] = await achievementsService.fetchAchievementsDataByEmployeeId(userId);
      setAchievementsData(
        getFilteredAchievementsData(getAchievementsDataWithCount(response), searchParams.get('filter')),
      );
    }
  };

  useEffect(() => {
    fetchAndFilterAchievementsData();
  }, [location.href]);

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
    const unselectedLevelAchievements = changedAchievements.filter((achievement) => {
      const isErrorWhenDatesExist =
        achievement.issueDate !== null &&
        achievement.issueDate !== undefined &&
        achievement.checked === true &&
        achievement.expiringDate !== null &&
        achievement.expiringDate !== undefined;
      return (
        ((achievement.issueDate === null || achievement.issueDate === undefined) && achievement.checked === true) ||
        (isErrorWhenDatesExist && dayjs(achievement.expiringDate).isBefore(dayjs(achievement.issueDate))) ||
        (isErrorWhenDatesExist && dayjs(achievement.expiringDate).diff(dayjs(achievement.issueDate), 'year') < 1)
      );
    });
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
    dispatch(setAchievementsTabState());
    dispatch(setChangedAchievements([]));
    setOpenSnackbar(true);
  };

  const handleCancel = async () => {
    achievementsData.forEach((achievement) => (achievement.hasError = false));
    await fetchAndFilterAchievementsData();
    dispatch(setChangedAchievements([]));
    dispatch(setAchievementsTabState());
    dispatch(triggerOnCancel());
  };

  return (
    <>
      {achievementsData && (
        <AchievementsTab achievementsData={achievementsData} saveFunction={handleSave} cancelFunction={handleCancel} />
      )}
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onCancel={confirmationDialogOnCancel}
        onConfirm={confirmationDialogOnConfirm}
      />
      <CustomSnackbar open={openSnackbar} setOpen={setOpenSnackbar} message="Achievements successfully updated" />
    </>
  );
};

export default AchievementsTabData;
