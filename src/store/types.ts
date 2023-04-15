import { SkillsTabState } from '../components/skillsTab/models/enums/SkillsTabState';
import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';

export interface onCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface ChangedSkillsDataRoot {
  changedSkills: {
    value: ChangedSkill[];
  };
}

export interface ViewStateRoot {
  viewSkillsState: {
    value: SkillsTabState;
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
