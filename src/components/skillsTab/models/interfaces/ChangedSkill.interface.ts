import { SkillLevel } from '../enums/SkillLevel';

export interface ChangedSkill {
  id: string;
  checked: boolean;
  skillLevel: SkillLevel;
  skillName: string;
}
