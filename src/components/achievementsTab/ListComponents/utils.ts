import { AchievementLevel } from '../models/enums/AchievementLevel';
import { AchievementLevelTooltip } from '../models/enums/AchievementLevelTooltip';

const mapAchievementLevelToTooltip = (achievementLevel: AchievementLevel) => {
  let tooltipText: string;
  switch (achievementLevel) {
    case AchievementLevel.BASIC:
      tooltipText = AchievementLevelTooltip.BASIC;
      break;
    case AchievementLevel.INTERMEDIATE:
      tooltipText = AchievementLevelTooltip.INTERMEDIATE;
      break;
    case AchievementLevel.EXPERT:
      tooltipText = AchievementLevelTooltip.EXPERT;
      break;
    default:
      tooltipText = '';
  }
  return tooltipText;
};

export default mapAchievementLevelToTooltip;
