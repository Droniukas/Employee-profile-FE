import { Box, List, ListItem, Typography } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';

import { Skill } from '../../models/Skill.interface';
import SkillsTabCategory from './SkillsTabCategory';
import SkillsTabFilterDropdown from './SkillsTabFilterDropdown';
import SkillsTabStateButtons from './SkillsTabStateButtons';
import { sortBySkill } from './utils';

type SkillsTabProps = {
  skillsData: Skill[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

const SkillsTab: React.FunctionComponent<SkillsTabProps> = (props: SkillsTabProps) => {
  const { cancelFunction, saveFunction, skillsData } = props;
  const mapData = (skills: Skill[]): ReactNode => {
    {
      return skills.map((skill: Skill) => {
        if (skill.showOnFilter) {
          return (
            <SkillsTabCategory key={skill.skillId} currentSkill={skill} skillsData={skillsData} mapData={mapData} />
          );
        }
      });
    }
  };
  return (
    <>
      {}
      <Box component="span" sx={{ width: '1344px', display: 'inline-block' }}>
        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Box display="inline-block">
            <SkillsTabFilterDropdown />
          </Box>
          <Box display="inline-block">
            <SkillsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
          </Box>
        </Box>
        {!skillsData.filter((skill) => skill.showOnFilter).length ? (
          <List
            sx={{
              width: '100%',
            }}
          >
            <ListItem alignItems="flex-start">
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: 20,
                }}
              >
                No selected skills found. Check the filter settings.
              </Typography>
            </ListItem>
          </List>
        ) : null}
        {mapData(skillsData.filter((skill: Skill) => skill.parentSkillId === null).sort(sortBySkill))}
      </Box>
    </>
  );
};

export default SkillsTab;
