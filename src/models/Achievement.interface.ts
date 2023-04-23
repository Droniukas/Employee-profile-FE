export interface Achievement {
  achievementId: string;
  achievementName: string;
  checked: boolean;
  issueDate: string | null;
  expiringDate: string | null;
  subItemsAreAchievements: boolean;
  indent: number;
  hasError?: boolean;
  showOnFilter?: boolean;
  selectedCount?: number;
  parentAchievementId: string | null;
  category: boolean;
}
