import { AchievementsTabState } from '../components/achievementsTab/models/enums/AchievementsTabState';
import { ChangedAchievement } from '../components/achievementsTab/models/interfaces/ChangedAchievement.interface';

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

export interface LoadingRoot {
  loading: {
    value: boolean;
  };
}

export interface OnCancelRoot {
  onCancel: {
    value: boolean;
  };
}
