import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import { Skill } from '../../models/Skill.interface';
import SkillListItem from './ListComponents/SkillListItem';
import { sortBySkill } from './ListComponents/utils';

type Props = {
  currentObj: Skill;
  skillDataArray: Skill[];
  mapData: (skillDataArray: Skill[]) => ReactNode;
};
const SkillTabCategory: React.FunctionComponent<Props> = (props: Props) => {
  const { currentObj, mapData, skillDataArray } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mapSkills = (arr: Skill[]) => {
    return arr.map((obj: Skill) => <SkillListItem skillObj={obj} key={obj.skillId} />);
  };

  return (
    <>
      <List
        component="ul"
        key={currentObj.skillId}
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
            ? mapSkills(
                skillDataArray.filter((obj: Skill) => currentObj.skillId === obj.parentSkillId).sort(sortBySkill),
              )
            : null}
        </Collapse>
      </List>
      <Collapse in={isCollapsed}>
        {!currentObj.subItemsAreSkills
          ? mapData(skillDataArray.filter((obj: Skill) => obj.parentSkillId === currentObj.skillId).sort(sortBySkill))
          : null}
      </Collapse>
    </>
  );
};

export default SkillTabCategory;
