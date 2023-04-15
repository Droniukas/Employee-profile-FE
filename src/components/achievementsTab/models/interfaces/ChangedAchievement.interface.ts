import { AchievementLevel } from '../enums/AchievementLevel';

export interface ChangedAchievement {
  id: string;
  checked: boolean;
  achievementLevel: AchievementLevel;
  achievementName: string;
}
