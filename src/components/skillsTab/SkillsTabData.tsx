import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ChangedSkill } from '../../models/ChangedSkill.interface';
import { Skill } from '../../models/Skill.interface';
import { SkillsService } from '../../services/skills.service';
import { setChangedSkills } from '../../states/changedSkills';
import { triggerOnCancel } from '../../states/onCancel';
import { setSkillsTabState } from '../../states/skillsTabState';
import store from '../../store/store';
import { SkillLevel } from '../enums/SkillLevel';
import SkillsTab from './SkillsTab';
import { getFilteredSkillsData, getSkillsDataWithCount } from './utils';

const SkillsTabData = () => {
  const [skillsData, setSkillsData] = useState<Array<Skill>>([]);
  const skillsService = new SkillsService();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAndFilterSkillsData();
  }, [location.href]);

  const fetchAndFilterSkillsData = async () => {
    const response: Skill[] = await skillsService.fetchSkillsData();
    setSkillsData(getFilteredSkillsData(getSkillsDataWithCount(response), searchParams.get('filter')));
  };

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
  };

  const handleSave = async () => {
    const changedSkills = store.getState().changedSkills.value;
    if (hasErrors()) return;
    console.log();
    await skillsService.updateEmployeeSkills(changedSkills);
    await fetchAndFilterSkillsData();
    dispatch(setSkillsTabState({}));
    dispatch(setChangedSkills([]));
  };

  const handleCancel = async () => {
    skillsData.forEach((skill) => (skill.hasError = false));
    await fetchAndFilterSkillsData();
    dispatch(setChangedSkills([]));
    dispatch(setSkillsTabState({}));
    dispatch(triggerOnCancel({}));
  };

  return (
    <>
      {skillsData ? (
        <SkillsTab skillsData={skillsData} saveFunction={handleSave} cancelFunction={handleCancel} />
      ) : null}
    </>
  );
};

export default SkillsTabData;
