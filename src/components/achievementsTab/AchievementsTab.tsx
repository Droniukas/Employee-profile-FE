import { Box, List, ListItem, Typography } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Achievement } from '../../models/Achievement.interface';
import AchievementsTabCategory from './AchievementsTabCategory';
import AchievementsTabExpandButton from './AchievementsTabExpandButton';
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

  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');

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
      <Box component="span" sx={{ width: '70vw', display: 'inline-block' }}>
        {!employeeIdParam && (
          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <AchievementsTabFilterDropdown />
              <AchievementsTabExpandButton />
            </Box>
            <Box display="inline-block">
              <AchievementsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
            </Box>
          </Box>
        )}
        {employeeIdParam && achievementsData.filter((achievement) => achievement.showOnFilter).length > 1 && (
          <AchievementsTabExpandButton />
        )}
        {!achievementsData.filter((achievement) => achievement.showOnFilter).length ? (
          <List
            sx={{
              width: '100%',
            }}
          >
            <ListItem alignItems="flex-start">
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: 20,
                }}
              >
                {!employeeIdParam
                  ? 'No selected achievements found. Check the filter settings.'
                  : 'Employee has no selected achievements.'}
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
