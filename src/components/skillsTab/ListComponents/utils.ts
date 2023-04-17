import { Skill } from '../../../models/Skill.interface';
import { SkillLevel } from '../../enums/SkillLevel';
import { SkillLevelTooltip } from '../../enums/SkillLevelTooltip';

const mapSkillLevelToTooltip = (skillLevel: SkillLevel) => {
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

export default mapSkillLevelToTooltip;
