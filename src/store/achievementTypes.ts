import { AchievementsTabState } from '../components/enums/AchievementsTabState';
import { ChangedAchievement } from '../models/ChangedAchievement.interface';

export interface onCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface ChangedAchievementsDataRoot {
  changedAchievements: {
    value: ChangedAchievement[];
  };
}

export interface ViewStateRoot {
  viewAchievementsState: {
    value: AchievementsTabState;
  };
}

export interface OnCancelRoot {
  onCancel: {
    value: boolean;
  };
}
