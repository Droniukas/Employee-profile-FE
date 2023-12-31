import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ChangedSkill } from '../../models/ChangedSkill.interface';
import { Skill } from '../../models/Skill.interface';
import { SkillsService } from '../../services/skills.service';
import { setChangedSkills } from '../../states/changedSkills';
import { triggerOnCancel } from '../../states/onCancel';
import { setSkillsTabState } from '../../states/skillsTabState';
import store from '../../store/store';
import { SkillWithErrorIdRoot } from '../../store/types/skills';
import { UserStateRoot } from '../../store/types/user';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import CustomSnackbar from '../customSnackbar/CustomSnackbar';
import { SkillLevel } from '../enums/SkillLevel';
import { changedSkillsHaveDifferences } from '../main/utils';
import SkillsTab from './SkillsTab';
import { getFilteredSkillsData, getSkillsDataWithCount } from './utils';

type SkillsTabDataProps = {
  confirmationDialogOpen: boolean;
  confirmationDialogOnCancel: () => void;
  confirmationDialogOnConfirm: () => void;
  skillsData: Skill[];
  setSkillsData: React.Dispatch<React.SetStateAction<Skill[]>>;
};

const SkillsTabData: React.FunctionComponent<SkillsTabDataProps> = (props) => {
  const { confirmationDialogOnCancel, confirmationDialogOnConfirm, confirmationDialogOpen, skillsData, setSkillsData } =
    props;
  const skillsService = new SkillsService();
  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();

  const skillWithErrorId = useSelector((state: SkillWithErrorIdRoot) => state.skillWithErrorId.value);

  useEffect(() => {
    setErrorForSkillById(skillWithErrorId.skillId);
    setSkillsData([...skillsData]);
  }, [skillWithErrorId]);

  const setErrorForSkillById = (childSkillId: number) => {
    const skillWithError: Skill | undefined = skillsData.find((skill) => skill.skillId === childSkillId);
    if (skillWithError === undefined) return;
    skillWithError.hasError = false;

    const skillsUnderTheSameCategory = skillsData.filter(
      (skill) => skill.parentSkillId === skillWithError.parentSkillId,
    );
    if (skillsUnderTheSameCategory.some((skill) => skill.hasError)) return;

    const parentSkills = skillsData.filter((parentSkill) => parentSkill.skillId === skillWithError.parentSkillId);
    parentSkills.forEach((skill) => {
      setErrorForSkillById(skill.skillId);
    });
  };

  const user = useSelector((state: UserStateRoot) => state.userState.value);

  const fetchAndFilterSkillsData = async () => {
    if (employeeIdParam) {
      const response: Skill[] = await skillsService.fetchSkillsDataByEmployeeId(Number(employeeIdParam));
      setSkillsData(getFilteredSkillsData(getSkillsDataWithCount(response), 'my'));
    } else {
      if (user) {
        const response: Skill[] = await skillsService.fetchSkillsDataByEmployeeId(user.id);
        setSkillsData(getFilteredSkillsData(getSkillsDataWithCount(response), searchParams.get('filter')));
      }
    }
  };

  useEffect(() => {
    fetchAndFilterSkillsData();
  }, [location.href]);

  const setErrorForSkills = (childSkill: ChangedSkill | Skill) => {
    const skillWithError = skillsData.find((skill) => skill.skillId === childSkill.skillId);
    if (skillWithError === undefined) throw new Error('undefined object...');
    skillWithError.hasError = true;
    const parentSkills = skillsData.filter((parentSkill) => parentSkill.skillId === skillWithError.parentSkillId);
    parentSkills.forEach((skill) => {
      setErrorForSkills(skill);
    });
  };

  const hasErrors = () => {
    const changedSkills = store.getState().changedSkills.value;
    skillsData.forEach((skill) => (skill.hasError = false));
    const unselectedLevelSkills = changedSkills.filter((changedSkill) => changedSkill.skillLevel === SkillLevel.NONE);
    if (unselectedLevelSkills.length > 0) {
      unselectedLevelSkills.forEach((changedSkillWithError) => {
        setErrorForSkills(changedSkillWithError);
      });
      setSkillsData([...skillsData]);
      return true;
    }
    setSkillsData([...skillsData]);
  };

  const handleSave = async () => {
    const changedSkills = store.getState().changedSkills.value;
    if (hasErrors()) return;
    await skillsService.updateEmployeeSkills(changedSkills);
    await fetchAndFilterSkillsData();
    dispatch(setSkillsTabState());
    dispatch(setChangedSkills([]));
    if (changedSkillsHaveDifferences(changedSkills, skillsData)) {
      setOpenSnackbar(true);
    }
  };

  const handleCancel = async () => {
    skillsData.forEach((skill) => (skill.hasError = false));
    setSkillsData([...skillsData]);
    dispatch(setChangedSkills([]));
    dispatch(setSkillsTabState());
    dispatch(triggerOnCancel());
  };

  return (
    <>
      {skillsData && <SkillsTab skillsData={skillsData} saveFunction={handleSave} cancelFunction={handleCancel} />}
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onCancel={confirmationDialogOnCancel}
        onConfirm={confirmationDialogOnConfirm}
      />
      <CustomSnackbar open={openSnackbar} setOpen={setOpenSnackbar} message="Skills successfully updated" />
    </>
  );
};

export default SkillsTabData;
