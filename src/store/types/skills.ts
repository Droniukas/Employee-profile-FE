import { SkillsTabState } from '../../components/enums/SkillsTabState';
import { ChangedSkill } from '../../models/ChangedSkill.interface';

export interface OnCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface ChangedSkillsDataRoot {
  changedSkills: {
    value: ChangedSkill[];
  };
}

export interface ViewSkillStateRoot {
  viewSkillsState: {
    value: SkillsTabState;
  };
}

export interface ExpandedSkillRoot {
  expandedSkill: {
    value: boolean;
  };
}

export interface SkillWithErrorIdRoot {
  skillWithErrorId: {
    value: { skillId: number };
  };
}
