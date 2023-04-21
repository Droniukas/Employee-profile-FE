import { SkillLevel } from '../components/enums/SkillLevel';

export interface ChangedSkill {
  skillId: string;
  checked: boolean;
  skillLevel: SkillLevel;
  skillName: string;
  employeeId: string;
}
