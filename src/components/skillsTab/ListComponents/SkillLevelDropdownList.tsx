import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { updateChangedSkill } from '../../../states/changedSkills';
import { SkillLevel } from '../../enums/SkillLevel';
import { mapSkillLevelToTooltip } from '../utils';
import SkillLevelDropdownListItem from './SkillLevelDropdownListItem';

type SkillLevelDropdownListProps = {
  skillLevel: SkillLevel | null;
  setSkillLevel: React.Dispatch<React.SetStateAction<SkillLevel>>;
  currentSkill: Skill;
  tooltipText: string;
};

const SkillLevelDropdownList: React.FunctionComponent<SkillLevelDropdownListProps> = (
  props: SkillLevelDropdownListProps,
) => {
  const { setSkillLevel, skillLevel, currentSkill, tooltipText } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const onDropdownChange = (selectedSkill: SkillLevel) => {
    setSkillLevel(selectedSkill);
    dispatch(
      updateChangedSkill({
        skillId: currentSkill.skillId,
        skillName: currentSkill.skillName,
        checked: true,
        skillLevel: selectedSkill,
        employeeId: process.env.REACT_APP_TEMP_USER_ID,
      }),
    );
  };

  const currentSkillLevels = currentSkill.language
    ? [SkillLevel.A1, SkillLevel.A2, SkillLevel.B1, SkillLevel.B2, SkillLevel.C1, SkillLevel.C2, SkillLevel.NATIVE]
    : [SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT];

  return (
    <>
      <List
        sx={{
          maxWidth: 150,
          marginRight: 5,
          marginBottom: '10px',
          marginTop: '10px',
          border: 1,
          width: '50%',
          ...(currentSkill.hasError
            ? {
                backgroundColor: '#ffefef',
                color: '#ef4349',
              }
            : {
                borderColor: 'primary.main',
                color: 'primary.main',
                backgroundColor: 'white',
              }),
        }}
        disablePadding
      >
        <Tooltip title={tooltipText} disableInteractive>
          <ListItemButton onClick={handleClick} sx={{ height: 1 }}>
            <ListItemText primary={skillLevel} sx={{ margin: 0 }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ margin: 0 }}>
            {currentSkillLevels.map((skillLevelName) => {
              const tooltipText: string = mapSkillLevelToTooltip(skillLevelName);

              const handleSkillSelection = () => {
                setSkillLevel(skillLevelName);
                setOpen(!open);
                onDropdownChange(skillLevelName);
              };

              return (
                <SkillLevelDropdownListItem
                  onSelection={handleSkillSelection}
                  name={skillLevelName}
                  key={skillLevelName}
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

export default SkillLevelDropdownList;
