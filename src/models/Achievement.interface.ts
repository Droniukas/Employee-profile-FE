export interface Achievement {
  id: string;
  achievementName: string;
  checked: boolean;
  issueDate: string | null;
  expiringDate: string | null;
  subItemsAreAchievements: boolean;
  indent: number;
  hasError?: boolean;
  parentId: string | null;
}
