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

const SkillLevelDropdownList: React.FunctionComponent<Props> = (props) => {
  const { setSkillLevel, skillLevel, skillObj, tooltipText } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const savedSkills = useSelector((state: ChangedSkillsDataRoot) => state.changedSkills.value);
  const dispatch = useDispatch();

  const onDropdownChange = (selectedSkill: SkillLevel) => {
    setSkillLevel(selectedSkill);
    dispatch(
      setChangedSkills([
        ...savedSkills.filter((item) => item.id !== skillObj.id),
        { id: skillObj.id, skill: skillObj.skillName, checked: true, skillLevel: selectedSkill },
      ]),
    );
  };

  const levelArr = skillObj.language
    ? [SkillLevel.A1, SkillLevel.A2, SkillLevel.B1, SkillLevel.B2, SkillLevel.C1, SkillLevel.C2, SkillLevel.NATIVE]
    : [SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT];
  console.log(skillObj);

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
              const tooltipText: string = SkillLevelTooltipMapper(skillLevelName);

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
            {/* cia jau languages darom */}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default SkillLevelDropdownList;
