import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { Skill } from './models/interfaces/Skill.interface';
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
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <SkillsTabStateButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
      </Box>
      <Box sx={{ width: '1176px', marginTop: '20px' }}>
        {mapData(skillDataArray.filter((obj: Skill) => obj.parentId === null))}
      </Box>
    </>
  );
};

export default SkillsTab;
