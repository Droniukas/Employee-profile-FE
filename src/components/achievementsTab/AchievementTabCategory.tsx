import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import AchievementListItem from './ListComponents/AchievementListItem';
import { Achievement } from './models/interfaces/Achievement.interface';

type Props = {
  currentObj: Achievement;
  achievementDataArray: Achievement[];
  mapData: (achievementDataArray: Achievement[]) => ReactNode;
};

const sortByAchievement = (a: Achievement, b: Achievement) => {
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

const AchievementTabCategory: React.FunctionComponent<Props> = (props: Props) => {
  const { currentObj, mapData, achievementDataArray } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mapAchievements = (arr: Achievement[]) => {
    return arr.map((obj: Achievement) => <AchievementListItem achievementObj={obj} showEndDate={true} key={obj.id} />);
  };

  return (
    <>
      <List
        key={currentObj.id}
        disablePadding
        sx={{
          border: 1,
          marginLeft: currentObj.indent * 6,
          backgroundColor: 'white',
          ...(currentObj.hasError
            ? {
                borderColor: '#ef4349',
                color: '#ef4349',
              }
            : {
                // borderColor: '#DDDDDD',
                // color: 'primary.main',
              }),
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <ListItemText primary={currentObj.achievementName} />
            {isCollapsed ? <ExpandLess /> : <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapsed}>
          {currentObj.subItemsAreAchievements
            ? mapAchievements(
                achievementDataArray
                  .filter((obj: Achievement) => currentObj.id === obj.parentId)
                  .sort(sortByAchievement),
              )
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentObj.subItemsAreAchievements
          ? mapData(
              achievementDataArray.filter((obj: Achievement) => obj.parentId === currentObj.id).sort(sortByAchievement),
            )
          : null}
      </Collapse>
    </>
  );
};

export default AchievementTabCategory;
