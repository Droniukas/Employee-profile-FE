import { SkillLevel } from '../components/enums/SkillLevel';

export interface Skill {
  id: string;
  skillName: string;
  checked: boolean;
  skillLevel: SkillLevel | null;
  subItemsAreSkills: boolean;
  indent: number;
  hasError?: boolean;
  parentId: string | null;
  language: boolean;
}
