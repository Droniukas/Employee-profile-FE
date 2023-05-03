import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Achievement } from '../../models/Achievement.interface';
import { ExpandedAchievementRoot } from '../../store/types/achievements';
import AchievementListItem from './ListComponents/AchievementListItem';
import { sortByAchievement } from './utils';

type AchievementsTabCategoryProps = {
  currentAchievement: Achievement;
  achievementsData: Achievement[];
  mapData: (achievementsData: Achievement[]) => ReactNode;
};

const AchievementsTabCategory: React.FunctionComponent<AchievementsTabCategoryProps> = (
  props: AchievementsTabCategoryProps,
) => {
  const { currentAchievement, mapData, achievementsData } = props;
  const expanded = useSelector((state: ExpandedAchievementRoot) => state.expandedAchievement.value);

  useEffect(() => {
    setIsCollapsed(expanded);
  }, [expanded]);
  const [isCollapsed, setIsCollapsed] = useState(expanded);
  const mapAchievements = (achievements: Achievement[]) => {
    return achievements.map((achievement: Achievement) => {
      if (achievement.showOnFilter) {
        return <AchievementListItem achievement={achievement} key={achievement.achievementId} />;
      }
    });
  };

  return (
    <>
      <List
        component="ul"
        key={currentAchievement.achievementId}
        disablePadding
        sx={{
          border: 1,
          marginLeft: currentAchievement.indent * 6,
          backgroundColor: 'white',
          ...(currentAchievement.hasError
            ? {
                borderColor: '#ef4349',
              }
            : {
                borderColor: '#DDDDDD',
                color: 'primary.main',
              }),
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <ListItemText
              sx={{ ...(currentAchievement.hasError ? { color: '#ef4349' } : {}) }}
              primary={currentAchievement.achievementName}
            />
            {currentAchievement.selectedCount ? (
              <Box
                marginRight="20px"
                padding="15px"
                paddingBottom="1px"
                paddingTop="1px"
                borderRadius="16px"
                fontWeight="700"
                sx={{ backgroundColor: 'secondary.main', color: 'primary.main' }}
              >
                {currentAchievement.selectedCount}
              </Box>
            ) : null}
            {isCollapsed ? <ExpandLess /> : <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapsed}>
          {currentAchievement.subItemsAreAchievements
            ? mapAchievements(
                achievementsData
                  .filter(
                    (achievement: Achievement) => currentAchievement.achievementId === achievement.parentAchievementId,
                  )
                  .sort(sortByAchievement),
              )
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentAchievement.subItemsAreAchievements
          ? mapData(
              achievementsData
                .filter(
                  (achievement: Achievement) => achievement.parentAchievementId === currentAchievement.achievementId,
                )
                .sort(sortByAchievement),
            )
          : null}
      </Collapse>
    </>
  );
};

export default AchievementsTabCategory;
