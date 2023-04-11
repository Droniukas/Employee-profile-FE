import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import SkillListItem from './ListComponents/SkillListItem';
import { SkillData } from './models/interfaces/SkillData.interface';

type Props = {
  currentObj: SkillData;
  skillDataArray: SkillData[];
  mapData: (skillDataArray: SkillData[]) => ReactNode; // rename param
};

const sortBySkill = (a: SkillData, b: SkillData) => {
  const fa = a.skill.toLowerCase(),
    fb = b.skill.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
};

function SkillTabCategory({ currentObj, skillDataArray, mapData }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function mapSkills(arr: SkillData[]) {
    return arr.map((obj: SkillData) => <SkillListItem skillObj={obj} key={obj.id} />);
  }

  return (
    <>
      <List
        key={currentObj.id}
        disablePadding
        sx={{
          border: 1,
          marginLeft: currentObj.indent * 6,
          backgroundColor: 'white',
          ...(currentObj.hasError
            ? {
                borderColor: '#ef4349',
                color: '#ef4349',
              }
            : {
                borderColor: '#DDDDDD',
                color: 'primary.main',
              }),
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <ListItemText primary={currentObj.skill} />
            {isCollapsed ? <ExpandLess /> : <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapsed}>
          {currentObj.subItemsAreSkills
            ? mapSkills(skillDataArray.filter((obj: SkillData) => currentObj.id === obj.parentId).sort(sortBySkill))
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentObj.subItemsAreSkills
          ? mapData(skillDataArray.filter((obj: SkillData) => obj.parentId === currentObj.id).sort(sortBySkill))
          : null}
      </Collapse>
    </>
  );
}

export default SkillTabCategory;
