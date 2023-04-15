import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChangedAchievements } from '../../../state/changedAchievements';
import { ChangedAchievementsDataRoot } from '../../../store/achievementTypes';
import { AchievementLevel } from '../models/enums/AchievementLevel';
import { Achievement } from '../models/interfaces/Achievement.interface';
import AchievementLevelDropdownListItem from './AchievementLevelDropdownListItem';
import mapAchievementLevelToTooltip from './utils';

type Props = {
  achievementLevel: AchievementLevel | null;
  setAchievementLevel: React.Dispatch<React.SetStateAction<AchievementLevel>>;
  achievementObj: Achievement;
  tooltipText: string;
};

const AchievementLevelDropdownList: React.FunctionComponent<Props> = (props: Props) => {
  const { setAchievementLevel, achievementLevel, achievementObj, tooltipText } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const savedAchievements = useSelector((state: ChangedAchievementsDataRoot) => state.changedAchievements.value);
  const dispatch = useDispatch();

  const onDropdownChange = (selectedAchievement: AchievementLevel) => {
    setAchievementLevel(selectedAchievement);
    dispatch(
      setChangedAchievements([
        ...savedAchievements.filter((item) => item.id !== achievementObj.id),
        {
          id: achievementObj.id,
          achievement: achievementObj.achievementName,
          checked: true,
          achievementLevel: selectedAchievement,
        },
      ]),
    );
  };

  const levelArr = achievementObj.language
    ? [
        AchievementLevel.A1,
        AchievementLevel.A2,
        AchievementLevel.B1,
        AchievementLevel.B2,
        AchievementLevel.C1,
        AchievementLevel.C2,
        AchievementLevel.NATIVE,
      ]
    : [AchievementLevel.BASIC, AchievementLevel.INTERMEDIATE, AchievementLevel.EXPERT];

  return (
    <>
      <List
        sx={{
          maxWidth: 150,
          marginRight: 5,
          marginBottom: 0,
          border: 1,
          width: '50%',
          ...(achievementObj.hasError
            ? {
                backgroundColor: '#ffefef',
                color: '#ef4349',
              }
            : {
                borderColor: 'primary.main',
                color: 'primary.main',
              }),
        }}
        disablePadding
      >
        <Tooltip title={tooltipText} disableInteractive>
          <ListItemButton onClick={handleClick} sx={{ height: 1 }}>
            <ListItemText primary={achievementLevel} sx={{ margin: 0 }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ margin: 0 }}>
            {levelArr.map((achievementLevelName) => {
              const tooltipText: string = mapAchievementLevelToTooltip(achievementLevelName);

              const handleAchievementSelection = () => {
                setAchievementLevel(achievementLevelName);
                setOpen(!open);
                onDropdownChange(achievementLevelName);
              };

              if (achievementLevelName === achievementLevel) return null;
              return (
                <AchievementLevelDropdownListItem
                  onSelection={handleAchievementSelection}
                  name={achievementLevelName}
                  key={achievementLevelName}
                  tooltipTitle={tooltipText}
                />
              );
            })}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default AchievementLevelDropdownList;
