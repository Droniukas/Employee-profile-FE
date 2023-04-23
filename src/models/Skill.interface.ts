import { SkillLevel } from '../components/enums/SkillLevel';

export interface Skill {
  skillId: number;
  skillName: string;
  checked: boolean;
  skillLevel: SkillLevel | null;
  subItemsAreSkills: boolean;
  indent: number;
  hasError?: boolean;
  showOnFilter?: boolean;
  selectedCount?: number;
  parentSkillId: number | null;
  language: boolean;
  category: boolean;
}
