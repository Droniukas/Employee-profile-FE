import { SkillLevel } from '../models/enums/SkillLevel';
import { SkillLevelTooltip } from '../models/enums/SkillLevelTooltip';

function SkillLevelTooltipMapper(skillLevel: SkillLevel) {
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
}

export default SkillLevelTooltipMapper;
