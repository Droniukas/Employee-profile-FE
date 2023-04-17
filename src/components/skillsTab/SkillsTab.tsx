import { Box } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';

import { Skill } from '../../models/Skill.interface';
import { sortBySkill } from './ListComponents/utils';
import SkillsTabStateButtons from './SkillsTabStateButtons';
import SkillTabCategory from './SkillTabCategory';

type Props = {
  skillDataArray: Skill[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

const SkillsTab: React.FunctionComponent<Props> = (props: Props) => {
  const { cancelFunction, saveFunction, skillDataArray } = props;
  const mapData = (dataArr: Skill[]): ReactNode => {
    {
      return dataArr.map((currentObj: Skill) => {
        return (
          <SkillTabCategory
            key={currentObj.id}
            currentObj={currentObj}
            skillDataArray={skillDataArray}
            mapData={mapData}
          />
        );
      });
    }
  };

  return (
    <>
      <Box component="span" sx={{ width: '1176px', display: 'inline-block' }}>
        <Box component="span" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '20px' }}>
          <SkillsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
        </Box>
        {mapData(skillDataArray.filter((obj: Skill) => obj.parentId === null).sort(sortBySkill))}
      </Box>
    </>
  );
};

export default SkillsTab;
