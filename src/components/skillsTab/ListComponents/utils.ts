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

export default mapSkillLevelToTooltip;
