import { SkillsTabState } from '../components/enums/SkillsTabState';
import { ChangedSkill } from '../models/ChangedSkill.interface';

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

export interface OnCancelRoot {
  onCancel: {
    value: boolean;
  };
}
