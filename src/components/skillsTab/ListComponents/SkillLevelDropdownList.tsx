import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { updateChangedSkill } from '../../../states/changedSkills';
import { SkillLevel } from '../../enums/SkillLevel';
import { mapSkillLevelToTooltip } from '../utils';

type SkillLevelDropdownListProps = {
  skillLevel: SkillLevel;
  setSkillLevel: React.Dispatch<React.SetStateAction<SkillLevel>>;
  currentSkill: Skill;
  tooltipText: string;
};

const SkillLevelDropdownList: React.FunctionComponent<SkillLevelDropdownListProps> = (
  props: SkillLevelDropdownListProps,
) => {
  const { setSkillLevel, skillLevel, currentSkill, tooltipText } = props;
  const [open, setOpen] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSkillLevel(event.target.value as SkillLevel);
    dispatch(
      updateChangedSkill({
        skillId: currentSkill.skillId,
        skillName: currentSkill.skillName,
        checked: true,
        skillLevel: event.target.value,
        employeeId: process.env.REACT_APP_TEMP_USER_ID,
      }),
    );
  };

  const dispatch = useDispatch();

  const currentSkillLevels = currentSkill.language
    ? [SkillLevel.A1, SkillLevel.A2, SkillLevel.B1, SkillLevel.B2, SkillLevel.C1, SkillLevel.C2, SkillLevel.NATIVE]
    : [SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT];

  return (
    <Tooltip title={tooltipText} disableInteractive open={tooltipOpen}>
      <Stack
        marginRight="52px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          left: 0,
        }}
      >
        <Box
          className="filter-area"
          sx={{
            position: 'relative',
            left: 10,
          }}
        >
          <FormControl variant="standard">
            <Select
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onOpen={() => setTooltipOpen(false)}
              renderValue={() => {
                return skillLevel;
              }}
              value={skillLevel}
              onChange={(event: SelectChangeEvent) => {
                setSkillLevel(event.target.value as SkillLevel);
                setOpen(!open);
                handleChange(event);
              }}
              disableUnderline
              sx={{
                border: 1,
                padding: '5px',
                margin: '2px',
                paddingLeft: '10px',
                borderRadius: '10px',
                width: '150px',
                ...(currentSkill.hasError // cia checkintume reduxo store
                  ? {
                      backgroundColor: '#ffefef',
                      color: '#ef4349',
                    }
                  : {
                      borderColor: '#DDDDDD',
                      color: 'primary.main',
                      backgroundColor: 'white',
                    }),
              }}
              IconComponent={open ? ExpandLess : ExpandMore}
            >
              {currentSkillLevels.map((skillLevelName) => {
                return (
                  <MenuItem
                    key={skillLevelName}
                    value={skillLevelName}
                    sx={{
                      color: 'primary.main',
                    }}
                  >
                    <Tooltip key={skillLevelName} title={mapSkillLevelToTooltip(skillLevelName)} disableInteractive>
                      <b style={{ fontWeight: 'normal' }}>{skillLevelName}</b>
                    </Tooltip>
                  </MenuItem>
                );
              })}
              <MenuItem value={SkillLevel.NONE} hidden sx={{ margin: 0, padding: 0 }} />
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Tooltip>
  );
};

export default SkillLevelDropdownList;
