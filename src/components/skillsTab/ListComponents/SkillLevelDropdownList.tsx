import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { SkillLevel } from '../../enums/SkillLevel';
import SkillLevelDropdownListItem from './SkillLevelDropdownListItem';
import mapSkillLevelToTooltip from './utils';
import { updateChangedSkill } from '../../../state/changedSkills';
import store from '../../../store/store';

type Props = {
  skillLevel: SkillLevel | null;
  setSkillLevel: React.Dispatch<React.SetStateAction<SkillLevel>>;
  skillObj: Skill;
  tooltipText: string;
};

const SkillLevelDropdownList: React.FunctionComponent<Props> = (props: Props) => {
  const { setSkillLevel, skillLevel, skillObj, tooltipText } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const onDropdownChange = (selectedSkill: SkillLevel) => {
    setSkillLevel(selectedSkill);
    dispatch(
      updateChangedSkill({ id: skillObj.id, skill: skillObj.skillName, checked: true, skillLevel: selectedSkill }),
    );
    console.log(store.getState().changedSkills.value);
  };

  const levelArr = skillObj.language
    ? [SkillLevel.A1, SkillLevel.A2, SkillLevel.B1, SkillLevel.B2, SkillLevel.C1, SkillLevel.C2, SkillLevel.NATIVE]
    : [SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT];

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
            {levelArr.map((skillLevelName) => {
              const tooltipText: string = mapSkillLevelToTooltip(skillLevelName);

              const handleSkillSelection = () => {
                setSkillLevel(skillLevelName);
                setOpen(!open);
                onDropdownChange(skillLevelName);
              };

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
};

export default SkillLevelDropdownList;
