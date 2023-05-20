import { Achievement } from '../../models/Achievement.interface';
import { ChangedAchievement } from '../../models/ChangedAchievement.interface';
import { ChangedSkill } from '../../models/ChangedSkill.interface';
import { Skill } from '../../models/Skill.interface';

export const changedSkillsHaveDifferences = (changedSkills: ChangedSkill[], allPreviousSkills: Skill[]) => {
  return !changedSkills.every((changedSkill) => {
    return allPreviousSkills.some((skill) => {
      return (
        skill.skillId === changedSkill.skillId &&
        skill.checked === changedSkill.checked &&
        skill.skillLevel === changedSkill.skillLevel
      );
    });
  });
};

export const changedAchievementsHaveDifferences = (
  changedAchievements: ChangedAchievement[],
  allPreviousAchievements: Achievement[],
) => {
  return !changedAchievements.every((changedAchievement) => {
    return allPreviousAchievements.some((achievement) => {
      return (
        achievement.achievementId === changedAchievement.achievementId &&
        achievement.checked === changedAchievement.checked &&
        achievement.issueDate === changedAchievement.issueDate &&
        achievement.expiringDate === changedAchievement.expiringDate
      );
    });
  });
};
