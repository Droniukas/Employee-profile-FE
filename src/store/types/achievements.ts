import { AchievementsTabState } from '../../components/enums/AchievementsTabState';
import { ChangedAchievement } from '../../models/ChangedAchievement.interface';

export interface OnCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface ChangedAchievementsDataRoot {
  changedAchievements: {
    value: ChangedAchievement[];
  };
}

export interface achievementsTabStateRoot {
  achievementsTabState: {
    value: AchievementsTabState;
  };
}
export interface ExpandedAchievementRoot {
  expandedAchievement: {
    value: boolean;
  };
}

export interface AchievementWithErrorIdRoot {
  achievementWithErrorId: {
    value: { achievementId: number };
  };
}
