/* eslint-disable */
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Skill } from '../../../models/Skill.interface';
import { updateChangedSkill } from '../../../states/changedSkills';
import { SkillLevel } from '../../enums/SkillLevel';
import { mapSkillLevelToTooltip } from '../utils';
import { ProjectStatus } from '../../enums/ProjectStatus';

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

  const [status, setStatus] = useState<SkillLevel>(skillLevel);

  const dispatch = useDispatch();

  const onDropdownChange = (selectedSkill: SkillLevel) => {
    setSkillLevel(selectedSkill);
    setStatus(selectedSkill);
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
              value={skillLevel}
              onChange={(event: SelectChangeEvent) => {
                setSkillLevel(event.target.value as SkillLevel);
                setOpen(!open);
                onDropdownChange(event.target.value as SkillLevel);
              }}
              disableUnderline
              sx={{
                border: 1,
                padding: '5px',
                margin: '2px',
                paddingLeft: '10px',
                borderRadius: '10px',
                width: '150px',
                ...(currentSkill.hasError
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
              open={open}
            >
              {currentSkillLevels.map((skillLevelName) => {
                const tooltipText: string = mapSkillLevelToTooltip(skillLevelName);

                return (
                  <Tooltip key={skillLevelName} title={tooltipText} disableInteractive>
                    <MenuItem
                      key={skillLevelName}
                      value={skillLevelName}
                      sx={{
                        color: 'primary.main',
                      }}
                    >
                      <b style={{ fontWeight: 'normal' }}>{skillLevelName}</b>
                    </MenuItem>
                  </Tooltip>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Tooltip>
  );
};

export default SkillLevelDropdownList;
