import { AchievementLevel } from '../enums/AchievementLevel';

export interface Achievement {
  id: string;
  achievementName: string;
  checked: boolean;
  achievementLevel: AchievementLevel | null;
  subItemsAreAchievements: boolean;
  indent: number;
  hasError?: boolean;
  parentId: string | null;
  language: boolean;
}
