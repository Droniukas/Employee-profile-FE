import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChangedSkill } from '../../models/ChangedSkill.interface';
import { Skill } from '../../models/Skill.interface';
import { SkillsService } from '../../services/skills.service';
import { setChangedSkills } from '../../state/changedSkills';
import { setLoading } from '../../state/loading';
import { triggerOnCancel } from '../../state/onCancel';
import { setSkillsTabState } from '../../state/skillsTabState';
import store from '../../store/store';
import { SkillLevel } from '../enums/SkillLevel';
import SkillsTab from './SkillsTab';

const SkillsTabData = () => {
  const [skillDataArr, setSkillDataArr] = useState<Array<Skill>>([]);
  const skillsService = new SkillsService();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setLoading(true));
    const response: Array<Skill> = await skillsService.fetchSkillData();
    console.log(
      response.filter((obj) => obj.skillName === 'User Journey Map'),
      'from fetch',
    );
    setSkillDataArr(response);
    dispatch(setLoading(false));
  };

  const setErrorForSkills = (childObj: ChangedSkill | Skill) => {
    const skillWithError = skillDataArr.find((obj) => obj.skillId === childObj.skillId);
    if (skillWithError === undefined) throw new Error('undefined object...');
    skillWithError.hasError = true;
    const parentObjs = skillDataArr.filter((parentObj) => parentObj.skillId === skillWithError.parentSkillId);
    parentObjs.forEach((obj) => {
      setErrorForSkills(obj);
    });
  };

  const hasErrors = () => {
    const changedSkills = store.getState().changedSkills.value;
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
    const changedSkills = store.getState().changedSkills.value;
    if (hasErrors()) return;
    await skillsService.updateEmployeeSkill(changedSkills);
    await fetchData();
    dispatch(setSkillsTabState({}));
    dispatch(setChangedSkills([]));
  };

  const handleCancel = async () => {
    skillDataArr.forEach((obj) => (obj.hasError = false));
    await fetchData();
    dispatch(setChangedSkills([]));
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

// base64 error
// lag because of redux
// not being redirected to the login page every time (access tokens or something)
// kai save paspauzdiu nereikia, kai cancel pasapudziu reikia
// after making sure that you can use store.getState() remove the unneccesary rerendering while changing the SkillsTabState state
