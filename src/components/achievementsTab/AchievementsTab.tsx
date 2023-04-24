import { Box, List, ListItem, Typography } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';

import { Achievement } from '../../models/Achievement.interface';
import AchievementsTabCategory from './AchievementsTabCategory';
import AchievementsTabFilterDropdown from './AchievementsTabFilterDropdown';
import AchievementsTabStateButtons from './AchievementsTabStateButtons';
import { sortByAchievement } from './utils';

type AchievementsTabProps = {
  achievementsData: Achievement[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

const AchievementsTab: React.FunctionComponent<AchievementsTabProps> = (props: AchievementsTabProps) => {
  const { cancelFunction, saveFunction, achievementsData } = props;
  const mapData = (achievements: Achievement[]): ReactNode => {
    return achievements.map((achievement: Achievement) => {
      if (achievement.showOnFilter) {
        return (
          <AchievementsTabCategory
            key={achievement.achievementId}
            currentAchievement={achievement}
            achievementsData={achievementsData}
            mapData={mapData}
          />
        );
      }
    });
  };
  return (
    <>
      {}
      <Box component="span" sx={{ width: '1344px', display: 'inline-block' }}>
        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Box display="inline-block">
            <AchievementsTabFilterDropdown />
          </Box>
          <Box display="inline-block">
            <AchievementsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
          </Box>
        </Box>
        {!achievementsData.filter((achievement) => achievement.showOnFilter).length ? (
          <List
            sx={{
              width: '100%',
            }}
          >
            <ListItem alignItems="flex-start">
              <Typography
                sx={{
                  color: '#000048',
                  fontSize: 20,
                }}
              >
                No selected achievements found. Check the filter settings.
              </Typography>
            </ListItem>
          </List>
        ) : null}
        {mapData(
          achievementsData
            .filter((achievement: Achievement) => achievement.parentAchievementId === null)
            .sort(sortByAchievement),
        )}
      </Box>
    </>
  );
};

export default AchievementsTab;
