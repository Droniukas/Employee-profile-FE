import { ViewState } from '../components/skillsTab/models/enums/ViewState';
import { ChangedSkill } from '../components/skillsTab/models/interfaces/ChangedSkill.interface';

export interface onCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface SavedSkillsDataRoot {
  savedSkills: {
    value: ChangedSkill[];
  };
}

export interface ViewStateRoot {
  viewState: {
    value: ViewState;
  };
}

export interface LoadingRoot {
  loading: {
    value: boolean;
  };
}
