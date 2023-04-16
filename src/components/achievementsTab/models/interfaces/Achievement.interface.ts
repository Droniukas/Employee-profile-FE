export interface Achievement {
  id: string;
  achievementName: string;
  checked: boolean;
  achievementStartDate: string | null;
  achievementEndDate: string | null;
  subItemsAreAchievements: boolean;
  indent: number;
  hasError?: boolean;
  parentId: string | null;
}
