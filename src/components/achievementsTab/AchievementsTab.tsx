import { Box } from '@mui/material';
import { ReactNode } from 'react';

import AchievementsTabStateButtons from './AchievementsTabStateButtons';
import AchievementTabCategory from './AchievementTabCategory';
import { Achievement } from './models/interfaces/Achievement.interface';

type AchievementsTabProps = {
  achievementDataArray: Achievement[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

const AchievementsTab: React.FunctionComponent<AchievementsTabProps> = (props: AchievementsTabProps) => {
  const { cancelFunction, saveFunction, achievementDataArray } = props;

  const mapData = (dataArr: Achievement[]): ReactNode => {
    {
      return dataArr.map((currentObj: Achievement) => {
        return (
          <AchievementTabCategory
            key={currentObj.id}
            currentObj={currentObj}
            achievementDataArray={achievementDataArray}
            mapData={mapData}
          />
        );
      });
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <AchievementsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
      </Box>
      <Box sx={{ width: '1176px', marginTop: '20px' }}>
        {mapData(achievementDataArray.filter((obj: Achievement) => obj.parentId === null))}
      </Box>
    </>
  );
};

export default AchievementsTab;
