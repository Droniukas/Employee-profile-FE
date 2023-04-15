import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import SkillListItem from './ListComponents/SkillListItem';
import { Skill } from './models/interfaces/Skill.interface';

type Props = {
  currentObj: Skill;
  skillDataArray: Skill[];
  mapData: (skillDataArray: Skill[]) => ReactNode;
};

const sortBySkill = (a: Skill, b: Skill) => {
  const fa = a.skillName.toLowerCase(),
    fb = b.skillName.toLowerCase();
  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
};

const SkillTabCategory: React.FunctionComponent<Props> = (props: Props) => {
  const { currentObj, mapData, skillDataArray } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mapSkills = (arr: Skill[]) => {
    return arr.map((obj: Skill) => <SkillListItem skillObj={obj} key={obj.id} />);
  };

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
            <ListItemText primary={currentObj.skillName} />
            {isCollapsed ? <ExpandLess /> : <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapsed}>
          {currentObj.subItemsAreSkills
            ? mapSkills(skillDataArray.filter((obj: Skill) => currentObj.id === obj.parentId).sort(sortBySkill))
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentObj.subItemsAreSkills
          ? mapData(skillDataArray.filter((obj: Skill) => obj.parentId === currentObj.id).sort(sortBySkill))
          : null}
      </Collapse>
    </>
  );
};

export default SkillTabCategory;
