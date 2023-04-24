import { Achievement } from '../../models/Achievement.interface';
import { AchievementsTabFilter } from '../enums/AchievementsTabFilter';

export const sortByAchievement = (a: Achievement, b: Achievement) => {
  const fa = a.achievementName.toLowerCase(),
    fb = b.achievementName.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
};

export const getFilteredAchievementsData = (achievementsData: Achievement[], filter: string | undefined | null) => {
  if (filter === AchievementsTabFilter.MY_ACHIEVEMENTS_URL) {
    achievementsData.forEach((achievement) => {
      if (!achievement.category) {
        if (achievement.checked) {
          achievement.showOnFilter = true;
        }
        if (!achievement.checked) {
          achievement.showOnFilter = false;
        }
      }
    });
    mapFilterToCategories(achievementsData);
  }
  if (filter === AchievementsTabFilter.ALL_ACHIEVEMENTS_URL) {
    achievementsData.forEach((achievement) => {
      achievement.showOnFilter = true;
    });
  }
  return achievementsData;
};

const mapFilterToCategories = (achievementsData: Achievement[]) => {
  achievementsData.forEach((parentAchievement) => {
    if (parentAchievement.category) {
      const checkedCategoryAchievements = achievementsData
        .filter((childAchievement) => childAchievement.parentAchievementId === parentAchievement.achievementId)
        .filter((childAchievement) => childAchievement.checked);
      if (checkedCategoryAchievements.length > 0) {
        parentAchievement.showOnFilter = true;
        mapFilterToGrandparent(achievementsData, parentAchievement);
      }
    }
  });
};

const mapFilterToGrandparent = (achievementsData: Achievement[], parentAchievement: Achievement) => {
  const grandparentAchievement: Achievement | undefined = achievementsData.find((grandparentAchievement) => {
    return grandparentAchievement.achievementId === parentAchievement.parentAchievementId;
  });
  if (grandparentAchievement === undefined) return;
  grandparentAchievement.showOnFilter = true;
  mapFilterToGrandparent(achievementsData, grandparentAchievement);
};

export const getAchievementsDataWithCount = (achievementsData: Achievement[]) => {
  achievementsData.forEach((parentAchievement) => {
    if (parentAchievement.category) {
      const checkedCategoryAchievements = achievementsData
        .filter((childAchievement) => childAchievement.parentAchievementId === parentAchievement.achievementId)
        .filter((childAchievement) => childAchievement.checked);
      mapCountToParent(achievementsData, parentAchievement, checkedCategoryAchievements.length);
    }
  });
  return achievementsData;
};

const mapCountToParent = (achievementsData: Achievement[], parentAchievement: Achievement, count: number) => {
  let localCount = count;
  localCount += parentAchievement.selectedCount ? parentAchievement.selectedCount : 0;
  parentAchievement.selectedCount = localCount;

  const grandparentAchievement: Achievement | undefined = achievementsData.find((grandparentAchievement) => {
    return grandparentAchievement.achievementId === parentAchievement.parentAchievementId;
  });
  if (grandparentAchievement === undefined) {
    return;
  }
  mapCountToParent(achievementsData, grandparentAchievement, count);
};
