import { Box, Checkbox, checkboxClasses, FormControlLabel, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { updateChangedSkill } from '../../../states/changedSkills';
import { OnCancelRoot, ViewStateRoot } from '../../../store/types';
import { SkillLevel } from '../../enums/SkillLevel';
import { SkillsTabState } from '../../enums/SkillsTabState';
import { mapSkillLevelToTooltip } from '../utils';
import SkillLevelDropdownList from './SkillLevelDropdownList';
import SkillLevelWithTooltip from './SkillLevelWithTooltip';
import SkillListItemErrorText from './SkillListItemErrorText';

type Props = {
  skill: Skill;
};

const SkillListItem: React.FunctionComponent<Props> = (props: Props) => {
  const { skill } = props;
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.NONE);
  const [isChecked, setChecked] = useState<boolean>(false);

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
    !isChecked
      ? dispatch(
          updateChangedSkill({
            skillId: skill.skillId,
            skillName: skill.skillName,
            checked: true,
            skillLevel: skillLevel,
            employeeId: process.env.REACT_APP_TEMP_USER_ID,
          }),
        )
      : dispatch(
          updateChangedSkill({
            skillId: skill.skillId,
            skillName: skill.skillName,
            checked: false,
            skillLevel: null,
            employeeId: process.env.REACT_APP_TEMP_USER_ID,
          }),
        );
  };

  const tooltipText: string = mapSkillLevelToTooltip(skillLevel);

  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '27px' }}>
          <FormControlLabel
            control={
              <>
                <Checkbox
                  disabled={viewState === SkillsTabState.VIEW_STATE}
                  checked={isChecked}
                  onChange={onCheckboxChange}
                  sx={{
                    color: checkboxColor,
                    [`&.${checkboxClasses.checked}`]: {
                      color: checkboxColor,
                    },
                  }}
                />
              </>
            }
            label=""
          />
          <ListItemText
            sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main', float: 'top' }}
          >
            {skill.skillName}
            {skill.hasError ? <SkillListItemErrorText /> : null}
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
      </Box>
    </>
  );
};

export default SkillListItem;
