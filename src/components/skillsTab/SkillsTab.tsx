import { Box, List, ListItem, Typography } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Skill } from '../../models/Skill.interface';
import SkillsTabCategory from './SkillsTabCategory';
import SkillsTabExpandButton from './SkillsTabExpandButton';
import SkillsTabFilterDropdown from './SkillsTabFilterDropdown';
import SkillsTabStateButtons from './SkillsTabStateButtons';
import { sortBySkill } from './utils';

type SkillsTabProps = {
  skillsData: Skill[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

const SkillsTab: React.FunctionComponent<SkillsTabProps> = (props: SkillsTabProps) => {
  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');
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
      <Box component="span" sx={{ width: '70vw', display: 'inline-block' }}>
        {!employeeIdParam && (
          <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <SkillsTabFilterDropdown />
              <SkillsTabExpandButton />
            </Box>
            <Box>
              <SkillsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
            </Box>
          </Box>
        )}
        {employeeIdParam && skillsData.filter((skill) => skill.showOnFilter).length > 1 && <SkillsTabExpandButton />}
        {skillsData.length > 0 && !skillsData.filter((skill) => skill.showOnFilter).length && (
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
                {!employeeIdParam
                  ? 'No selected skills found. Check the filter settings.'
                  : 'Employee has no selected skills.'}
              </Typography>
            </ListItem>
          </List>
        )}
        {mapData(skillsData.filter((skill: Skill) => skill.parentSkillId === null).sort(sortBySkill))}
      </Box>
    </>
  );
};

export default SkillsTab;
