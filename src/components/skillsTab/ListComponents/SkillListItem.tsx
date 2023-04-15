import { Box, Checkbox, checkboxClasses, FormControlLabel, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChangedSkills } from '../../../state/changedSkills';
import { ChangedSkillsDataRoot, OnCancelRoot, ViewStateRoot } from '../../../store/types';
import { SkillLevel } from '../models/enums/SkillLevel';
import { SkillsTabState } from '../models/enums/SkillsTabState';
import { Skill } from '../models/interfaces/Skill.interface';
import SkillLevelDropdownList from './SkillLevelDropdownList';
import SkillLevelWithTooltip from './SkillLevelWithTooltip';
import SkillListItemErrorText from './SkillListItemErrorText';
import mapSkillLevelToTooltip from './utils';

type Props = {
  skillObj: Skill;
};

const SkillListItem: React.FunctionComponent<Props> = (props: Props) => {
  const { skillObj } = props;
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.NONE);
  const [isChecked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(skillObj.checked);
    skillObj.skillLevel !== null ? setSkillLevel(skillObj.skillLevel) : setSkillLevel(SkillLevel.NONE);
  }, [skillObj.checked, skillObj.skillLevel]);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(skillObj.checked);
    skillObj.skillLevel !== null ? setSkillLevel(skillObj.skillLevel) : setSkillLevel(SkillLevel.NONE);
  }, [onCancel]);

  const checkboxColor = viewState == SkillsTabState.VIEW_STATE ? 'adaec3' : 'primary.main';

  const changedSkills = useSelector((state: ChangedSkillsDataRoot) => state.changedSkills.value);
  const dispatch = useDispatch();

  const onCheckboxChange = () => {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          setChangedSkills([
            ...changedSkills,
            { id: skillObj.id, skill: skillObj.skillName, checked: true, skillLevel: skillLevel },
          ]),
        )
      : dispatch(
          setChangedSkills([
            ...changedSkills.filter((item) => item.id !== skillObj.id),
            { id: skillObj.id, skill: skillObj.skillName, checked: false, skillLevel: null },
          ]),
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
          <ListItemText sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main' }}>
            {skillObj.skillName}
            {skillObj.hasError ? <SkillListItemErrorText /> : null}
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
                skillObj={skillObj}
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
