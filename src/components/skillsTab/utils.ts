import { Skill } from '../../models/Skill.interface';
import { SkillLevel } from '../enums/SkillLevel';
import { SkillLevelTooltip } from '../enums/SkillLevelTooltip';
import { SkillsTabFilter } from '../enums/SkillsTabFilter';

export const mapSkillLevelToTooltip = (skillLevel: SkillLevel) => {
  let tooltipText: string;
  switch (skillLevel) {
    case SkillLevel.BASIC:
      tooltipText = SkillLevelTooltip.BASIC;
      break;
    case SkillLevel.INTERMEDIATE:
      tooltipText = SkillLevelTooltip.INTERMEDIATE;
      break;
    case SkillLevel.EXPERT:
      tooltipText = SkillLevelTooltip.EXPERT;
      break;
    default:
      tooltipText = '';
  }
  return tooltipText;
};

export const sortBySkill = (a: Skill, b: Skill) => {
  const fa = a.skillName.toLowerCase(),
    fb = b.skillName.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
};

export const getFilteredSkillsData = (skillsData: Skill[], filter: string | undefined | null) => {
  if (filter === SkillsTabFilter.MY_SKILLS_URL) {
    skillsData.forEach((skill) => {
      if (!skill.category) {
        if (skill.checked) {
          skill.showOnFilter = true;
        }
        if (!skill.checked) {
          skill.showOnFilter = false;
        }
      }
    });
    mapFilterToCategories(skillsData);
  }
  if (filter === SkillsTabFilter.ALL_SKILLS_URL) {
    skillsData.forEach((skill) => {
      skill.showOnFilter = true;
    });
  }
  return skillsData;
};

const mapFilterToCategories = (skillsData: Skill[]) => {
  skillsData.forEach((parentSkill) => {
    if (parentSkill.category) {
      const checkedCategorySkills = skillsData
        .filter((childSkill) => childSkill.parentSkillId === parentSkill.skillId)
        .filter((childSkill) => childSkill.checked);
      if (checkedCategorySkills.length > 0) {
        parentSkill.showOnFilter = true;
        mapFilterToGrandparent(skillsData, parentSkill);
      }
    }
  });
};

const mapFilterToGrandparent = (skillsData: Skill[], parentSkill: Skill) => {
  const grandparentSkill: Skill | undefined = skillsData.find((grandparentSkill) => {
    return grandparentSkill.skillId === parentSkill.parentSkillId;
  });
  if (grandparentSkill === undefined) return;
  grandparentSkill.showOnFilter = true;
  mapFilterToGrandparent(skillsData, grandparentSkill);
};

export const getSkillsDataWithCount = (skillsData: Skill[]) => {
  skillsData.forEach((parentSkill) => {
    if (parentSkill.category) {
      const checkedCategorySkills = skillsData
        .filter((childSkill) => childSkill.parentSkillId === parentSkill.skillId)
        .filter((childSkill) => childSkill.checked);
      mapCountToParent(skillsData, parentSkill, checkedCategorySkills.length);
    }
  });
  return skillsData;
};

const mapCountToParent = (skillsData: Skill[], parentSkill: Skill, count: number) => {
  let localCount = count;
  localCount += parentSkill.selectedCount ? parentSkill.selectedCount : 0;
  parentSkill.selectedCount = localCount;

  const grandparentSkill: Skill | undefined = skillsData.find((grandparentSkill) => {
    return grandparentSkill.skillId === parentSkill.parentSkillId;
  });
  if (grandparentSkill === undefined) {
    return;
  }
  mapCountToParent(skillsData, grandparentSkill, count);
};
