import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChangedSkills } from '../../../state/changedSkills';
import { ChangedSkillsDataRoot } from '../../../store/types';
import { SkillLevel } from '../models/enums/SkillLevel';
import { Skill } from '../models/interfaces/Skill.interface';
import SkillLevelDropdownListItem from './SkillLevelDropdownListItem';
import SkillLevelTooltipMapper from './utils';

type Props = {
  skillLevel: SkillLevel | null;
  setSkillLevel: React.Dispatch<React.SetStateAction<SkillLevel>>;
  skillObj: Skill;
  tooltipText: string;
};

function SkillLevelDropdownList({ skillLevel, setSkillLevel, skillObj, tooltipText }: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const savedSkills = useSelector((state: ChangedSkillsDataRoot) => state.changedSkills.value);
  const dispatch = useDispatch();

  function onDropdownChange(selectedSkill: SkillLevel) {
    setSkillLevel(selectedSkill);
    dispatch(
      setChangedSkills([
        ...savedSkills.filter((item) => item.id !== skillObj.id),
        { id: skillObj.id, skill: skillObj.skillName, checked: true, skillLevel: selectedSkill },
      ]),
    );
  }

  return (
    <>
      <List
        sx={{
          maxWidth: 150,
          marginRight: 5,
          marginBottom: 0,
          border: 1,
          width: '50%',
          ...(skillObj.hasError
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
            <ListItemText primary={skillLevel} sx={{ margin: 0 }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ margin: 0 }}>
            {[SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT].map((skillLevelName) => {
              const tooltipText: string = SkillLevelTooltipMapper(skillLevelName);

              function handleSkillSelection() {
                setSkillLevel(skillLevelName);
                setOpen(!open);
                onDropdownChange(skillLevelName);
              }
              if (skillLevelName === skillLevel) return null;
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
}

export default SkillLevelDropdownList;
