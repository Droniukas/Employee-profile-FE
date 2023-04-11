import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { SkillData } from './models/interfaces/SkillData.interface';
import SkillTabCategory from './SkillTabCategory';
import ViewButtons from './ViewButtons';

type Props = {
  skillDataArray: SkillData[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

function SkillsTab({ skillDataArray, saveFunction, cancelFunction }: Props) {
  function mapData(dataArr: SkillData[]): ReactNode {
    {
      return dataArr.map((currentObj: SkillData) => {
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
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <ViewButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
      </Box>
      <Box sx={{ width: '1176px', marginTop: '100px' }}>
        {mapData(skillDataArray.filter((obj: SkillData) => obj.parentId === null))}
      </Box>
    </>
  );
}

export default SkillsTab;
