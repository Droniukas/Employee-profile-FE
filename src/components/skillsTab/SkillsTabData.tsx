import React, { useEffect, useState } from 'react';
import SkillsTab from './SkillsTab';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../features/loading';
import axios from 'axios';
import { setViewState } from '../../features/viewState';
import { SavedSkillsDataRoot } from '../../store/types';
import { SkillLevel } from './models/enums/SkillLevel';
import { SkillData } from './models/interfaces/SkillData.interface';
import { SavedSkills } from './models/interfaces/SavedSkillData.interface';
import { triggerOnCancel } from '../../features/onCancel';
import { setSavedSkills } from '../../features/savedSkills';
import { SkillsService } from '../../services/skills.service';

function SkillsTabData() {
  const [skillDataArr, setSkillDataArr] = useState<Array<SkillData>>([]);
  const savedSkills = useSelector((state: SavedSkillsDataRoot) => state.savedSkills.value);

  const skillsService = new SkillsService();

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    dispatch(setLoading(true));
    const response = await skillsService.fetchSkillData();
    setSkillDataArr(response);
    dispatch(setLoading(false));
  }

  function setErrorForSkills(childObj: SavedSkills | SkillData) {
    const skillWithError = skillDataArr.find((obj) => obj.id === childObj.id);
    if (skillWithError === undefined) throw new Error('undefined object...');
    skillWithError.hasError = true;
    const parentObjs = skillDataArr.filter((parentObj) => parentObj.id === skillWithError.parentId);
    parentObjs.forEach((obj) => {
      setErrorForSkills(obj);
    });
  }

  function errorCheck() {
    skillDataArr.forEach((obj) => (obj.hasError = false));
    const unselectedLevelSkills = savedSkills.filter((obj) => obj.skillLevel === SkillLevel.NONE);
    if (unselectedLevelSkills.length > 0) {
      unselectedLevelSkills.forEach((objWithError) => {
        setErrorForSkills(objWithError);
      });
      setSkillDataArr([...skillDataArr]);
      return true;
    }
  }

  async function handleSave() {
    if (errorCheck()) return;
    dispatch(setViewState({}));
    savedSkills.forEach(async (obj) => {
      skillsService.updateEmployeeSkill(obj);
    });
    dispatch(setSavedSkills([]));
    await fetchData();
  }

  async function handleCancel() {
    skillDataArr.forEach((obj) => (obj.hasError = false));
    dispatch(setSavedSkills([]));
    dispatch(setViewState({}));
    dispatch(triggerOnCancel({}));
  }

  return (
    <>
      {skillDataArr ? (
        <SkillsTab
          skillData={skillDataArr}
          saveFunction={handleSave}
          cancelFunction={handleCancel}
        />
      ) : null}
    </>
  );
}

export default SkillsTabData;
