export interface Achievement {
  achievementId: number;
  achievementName: string;
  checked: boolean;
  issueDate: string | null;
  expiringDate: string | null;
  subItemsAreAchievements: boolean;
  indent: number;
  hasError?: boolean;
  showOnFilter?: boolean;
  selectedCount?: number;
  parentAchievementId: number | null;
  category: boolean;
}
