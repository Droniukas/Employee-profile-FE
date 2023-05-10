import { Box, Checkbox, checkboxClasses, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { updateChangedSkill } from '../../../states/changedSkills';
import { setSkillWithErrorId } from '../../../states/skillWithErrorId';
import { OnCancelRoot, SkillsTabStateRoot } from '../../../store/types/skills';
import { UserStateRoot } from '../../../store/types/user';
import { SkillLevel } from '../../enums/SkillLevel';
import { SkillsTabState } from '../../enums/SkillsTabState';
import { mapSkillLevelToTooltip } from '../utils';
import SkillLevelDropdownList from './SkillLevelDropdownList';
import SkillLevelWithTooltip from './SkillLevelWithTooltip';
import SkillListItemErrorText from './SkillListItemErrorText';

type SkillListItemProps = {
  skill: Skill;
};

const SkillListItem: React.FunctionComponent<SkillListItemProps> = (props: SkillListItemProps) => {
  const { skill } = props;
  const viewState = useSelector((state: SkillsTabStateRoot) => state.skillsTabState.value);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.NONE);
  const [isChecked, setChecked] = useState<boolean>(false);
  const userId = useSelector((state: UserStateRoot) => state.userState.value).id;

  useEffect(() => {
    setChecked(skill.checked);
    skill.skillLevel !== null ? setSkillLevel(skill.skillLevel) : setSkillLevel(SkillLevel.NONE);
  }, [skill.checked, skill.skillLevel]);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(skill.checked);
    skill.skillLevel !== null ? setSkillLevel(skill.skillLevel) : setSkillLevel(SkillLevel.NONE);
  }, [onCancel]);

  const checkboxColor = viewState == SkillsTabState.VIEW_STATE ? 'adaec3' : 'primary.main';

  const dispatch = useDispatch();

  const onCheckboxChange = () => {
    setChecked(!isChecked);
    if (!isChecked) {
      dispatch(
        updateChangedSkill({
          skillId: skill.skillId,
          skillName: skill.skillName,
          checked: true,
          skillLevel: skillLevel,
          employeeId: userId,
        }),
      );
    } else {
      if (skill.hasError) {
        dispatch(setSkillWithErrorId({ skillId: skill.skillId }));
      }
      dispatch(
        updateChangedSkill({
          skillId: skill.skillId,
          skillName: skill.skillName,
          checked: false,
          skillLevel: null,
          employeeId: userId,
        }),
      );
    }
  };

  const tooltipText: string = mapSkillLevelToTooltip(skillLevel);

  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '27px' }}>
          <Checkbox
            disabled={viewState === SkillsTabState.VIEW_STATE}
            checked={isChecked}
            onChange={onCheckboxChange}
            sx={{
              color: checkboxColor,
              [`&.${checkboxClasses.checked}`]: {
                color: checkboxColor,
              },
              marginLeft: -2,
            }}
          />
          <ListItemText
            sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main', float: 'top' }}
          >
            {skill.skillName}
          </ListItemText>
          {viewState === SkillsTabState.VIEW_STATE ? (
            isChecked ? (
              <SkillLevelWithTooltip name={skillLevel} tooltipText={tooltipText} />
            ) : null
          ) : null}
          {viewState === SkillsTabState.EDIT_STATE ? (
            isChecked ? (
              <SkillLevelDropdownList
                skillLevel={skillLevel}
                setSkillLevel={setSkillLevel}
                currentSkill={skill}
                tooltipText={tooltipText}
              />
            ) : null
          ) : null}
        </ListItem>
        {skill.hasError ? (
          <ListItem sx={{ padding: 0, margin: 0, marginLeft: '50px' }}>
            <SkillListItemErrorText />
          </ListItem>
        ) : null}
      </Box>
    </>
  );
};

export default SkillListItem;
