import { SkillLevel } from '../components/enums/SkillLevel';

export interface ChangedSkill {
  skillId: number;
  checked: boolean;
  skillLevel: SkillLevel;
  skillName: string;
  employeeId: number;
}
