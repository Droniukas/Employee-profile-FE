import { SkillLevel } from '../components/enums/SkillLevel';

export interface Skill {
  skillId: string;
  skillName: string;
  checked: boolean;
  skillLevel: SkillLevel | null;
  subItemsAreSkills: boolean;
  indent: number;
  hasError?: boolean;
  parentSkillId: string | null;
  language: boolean;
}
