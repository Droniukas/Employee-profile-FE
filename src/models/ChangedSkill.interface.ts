import { SkillLevel } from '../components/enums/SkillLevel';

export interface ChangedSkill {
  id: string;
  checked: boolean;
  skillLevel: SkillLevel;
  skillName: string;
}
