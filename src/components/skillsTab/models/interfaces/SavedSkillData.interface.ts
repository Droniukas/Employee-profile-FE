import { SkillLevel } from '../enums/SkillLevel'

export interface SavedSkills {
  id: string
  checked: boolean
  skillLevel: SkillLevel
  skill: string
}
