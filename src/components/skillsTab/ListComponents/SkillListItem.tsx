import { Box, FormControlLabel, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import SkillCheckbox from './SkillListCheckbox';
import { ViewState } from '../models/enums/ViewState';
import { useDispatch, useSelector } from 'react-redux';
import { SavedSkillsDataRoot, ViewStateRoot, onCancelRoot } from '../../../store/types';
import { SkillLevel } from '../models/enums/SkillLevel';
import { setSavedSkills } from '../../../features/savedSkills';
import LevelDropdownField from './LevelDropdownField';
import SkillListItemLevel from './SkillListItemViewLevel';
import { SkillLevelTooltip } from '../models/enums/SkillLevelTooltip';
import SkillListItemErrorText from './SkillListItemErrorText';
import { SkillData } from '../models/interfaces/SkillData.interface';

type Props = {
  skillObj: SkillData;
};

function SkillListItem({ skillObj }: Props) {
  const viewState = useSelector((state: ViewStateRoot) => state.viewState.value);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.NONE);
  const [isChecked, setChecked] = useState<boolean>(false);
  const onCancel = useSelector((state: onCancelRoot) => state.onCancel.value);

  useEffect(() => {
    setChecked(skillObj.checked);
    skillObj.skillLevel !== null
      ? setSkillLevel(skillObj.skillLevel)
      : setSkillLevel(SkillLevel.NONE);
  }, [onCancel]);

  const savedSkills = useSelector((state: SavedSkillsDataRoot) => state.savedSkills.value);
  const dispatch = useDispatch();

  function onCheckboxChange() {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          setSavedSkills([
            ...savedSkills,
            { id: skillObj.id, skill: skillObj.skill, checked: true, skillLevel: skillLevel },
          ]),
        )
      : dispatch(
          setSavedSkills([
            ...savedSkills.filter((item) => item.id !== skillObj.id),
            { id: skillObj.id, skill: skillObj.skill, checked: false, skillLevel: null },
          ]),
        );
  }

  let tooltipText: string;
  switch (skillLevel) {
    case SkillLevel.BASIC:
      tooltipText = SkillLevelTooltip.BASIC;
      break;
    case SkillLevel.INTERMEDIATE:
      tooltipText = SkillLevelTooltip.INTERMEDIATE;
      break;
    case SkillLevel.EXPERT:
      tooltipText = SkillLevelTooltip.EXPERT;
      break;
    default:
      tooltipText = '';
  }

  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '27px' }}>
          <FormControlLabel
            control={
              <SkillCheckbox
                isDisabled={viewState === ViewState.VIEW_STATE}
                isChecked={isChecked}
                onChange={onCheckboxChange}
              />
            }
            label=''
          />
          <ListItemText
            sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main' }}
          >
            {skillObj.skill}
            {skillObj.hasError ? <SkillListItemErrorText /> : null}
          </ListItemText>
          {viewState === ViewState.VIEW_STATE ? (
            isChecked ? (
              <SkillListItemLevel primaryText={skillLevel} tooltipText={tooltipText} />
            ) : null
          ) : null}
          {viewState === ViewState.EDIT_STATE ? (
            isChecked ? (
              <LevelDropdownField
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
