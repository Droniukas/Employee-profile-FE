import { ViewState } from '../components/skillsTab/models/enums/ViewState';
import { SavedSkills } from '../components/skillsTab/models/interfaces/SavedSkillData.interface';

export interface onCancelRoot {
  onCancel: {
    value: boolean;
  };
}

export interface SavedSkillsDataRoot {
  savedSkills: {
    value: SavedSkills[];
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
