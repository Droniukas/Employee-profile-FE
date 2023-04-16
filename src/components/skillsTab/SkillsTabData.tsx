import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChangedSkill } from '../../models/ChangedSkill.interface';
import { Skill } from '../../models/Skill.interface';
import { SkillsService } from '../../services/skills.service';
import { setChangedSkills } from '../../states/changedSkills';
import { setLoading } from '../../states/loading';
import { triggerOnCancel } from '../../states/onCancel';
import { setSkillsTabState } from '../../states/skillsTabState';
import { ChangedSkillsDataRoot } from '../../store/types';
import { SkillLevel } from '../enums/SkillLevel';
import SkillsTab from './SkillsTab';

const SkillsTabData = () => {
  const [skillDataArr, setSkillDataArr] = useState<Array<Skill>>([]);
  const changedSkills = useSelector((state: ChangedSkillsDataRoot) => state.changedSkills.value);

  const skillsService = new SkillsService();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setLoading(true));
    const response: Array<Skill> = await skillsService.fetchSkillData();
    setSkillDataArr(response);
    dispatch(setLoading(false));
  };

  const setErrorForSkills = (childObj: ChangedSkill | Skill) => {
    const skillWithError = skillDataArr.find((obj) => obj.id === childObj.id);
    if (skillWithError === undefined) throw new Error('undefined object...');
    skillWithError.hasError = true;
    const parentObjects = skillDataArr.filter((parentObject) => parentObject.id === skillWithError.parentId);
    parentObjects.forEach((obj) => {
      setErrorForSkills(obj);
    });
  };

  const hasErrors = () => {
    skillDataArr.forEach((obj) => (obj.hasError = false));
    const unselectedLevelSkills = changedSkills.filter((obj) => obj.skillLevel === SkillLevel.NONE);
    if (unselectedLevelSkills.length > 0) {
      unselectedLevelSkills.forEach((objWithError) => {
        setErrorForSkills(objWithError);
      });
      setSkillDataArr([...skillDataArr]);
      return true;
    }
  };

  const handleSave = async () => {
    if (hasErrors()) return;
    changedSkills.forEach(async (obj) => {
      await skillsService.updateEmployeeSkill(obj);
    });
    await fetchData();
    dispatch(setSkillsTabState({}));
    dispatch(setChangedSkills([]));
  };

  const handleCancel = async () => {
    skillDataArr.forEach((obj) => (obj.hasError = false));
    dispatch(setChangedSkills([]));
    await fetchData();
    dispatch(setSkillsTabState({}));
    dispatch(triggerOnCancel({}));
  };

  return (
    <>
      {skillDataArr ? (
        <SkillsTab skillDataArray={skillDataArr} saveFunction={handleSave} cancelFunction={handleCancel} />
      ) : null}
    </>
  );
};

export default SkillsTabData;
