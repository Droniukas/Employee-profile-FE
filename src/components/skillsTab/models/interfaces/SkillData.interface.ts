import { SkillLevel } from '../enums/SkillLevel';

export interface SkillData {
  id: string;
  skill: string;
  checked: boolean;
  skillLevel: SkillLevel | null;
  subItemsAreSkills: boolean;
  indent: number;
  hasError?: boolean;
  parentId: string | null;
}
