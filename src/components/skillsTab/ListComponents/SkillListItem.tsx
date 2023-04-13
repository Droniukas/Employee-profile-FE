import { Box, FormControlLabel, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSavedSkills } from '../../../features/savedSkills';
import { onCancelRoot, SavedSkillsDataRoot, ViewStateRoot } from '../../../store/types';
import { SkillLevel } from '../models/enums/SkillLevel';
import { ViewState } from '../models/enums/ViewState';
import { Skill } from '../models/interfaces/Skill.interface';
import SkillLevelDropdownList from './SkillLevelDropdownList';
import SkillLevelTooltipMapper from './utils';
import SkillLevelWithTooltip from './SkillLevelWithTooltip';
import SkillListCheckbox from './SkillListCheckbox';
import SkillListItemErrorText from './SkillListItemErrorText';

type Props = {
  skillObj: Skill;
};

function SkillListItem({ skillObj }: Props) {
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.NONE);
  const [isChecked, setChecked] = useState<boolean>(false);
  const onCancel = useSelector((state: onCancelRoot) => state.onCancel.value);

  useEffect(() => {
    setChecked(skillObj.checked);
    skillObj.skillLevel !== null ? setSkillLevel(skillObj.skillLevel) : setSkillLevel(SkillLevel.NONE);
  }, [onCancel]);

  const savedSkills = useSelector((state: SavedSkillsDataRoot) => state.savedSkills.value);
  const dispatch = useDispatch();

  function onCheckboxChange() {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          setSavedSkills([
            ...savedSkills,
            { id: skillObj.id, skill: skillObj.skillName, checked: true, skillLevel: skillLevel },
          ]),
        )
      : dispatch(
          setSavedSkills([
            ...savedSkills.filter((item) => item.id !== skillObj.id),
            { id: skillObj.id, skill: skillObj.skillName, checked: false, skillLevel: null },
          ]),
        );
  }

  const tooltipText: string = SkillLevelTooltipMapper(skillLevel);

  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '27px' }}>
          <FormControlLabel
            control={
              <SkillListCheckbox
                isDisabled={viewState === ViewState.VIEW_STATE}
                isChecked={isChecked}
                onChange={onCheckboxChange}
              />
            }
            label=""
          />
          <ListItemText sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main' }}>
            {skillObj.skillName}
            {skillObj.hasError ? <SkillListItemErrorText /> : null}
          </ListItemText>
          {viewState === ViewState.VIEW_STATE ? (
            isChecked ? (
              <SkillLevelWithTooltip name={skillLevel} tooltipText={tooltipText} />
            ) : null
          ) : null}
          {viewState === ViewState.EDIT_STATE ? (
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
}

export default SkillListItem;
