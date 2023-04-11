import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ViewButtons from './ViewButtons';
import SkillListItem from './ListComponents/SkillListItem';
import { SkillData } from './models/interfaces/SkillData.interface';

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

type Props = {
  skillData: SkillData[];
  saveFunction: () => void;
  cancelFunction: () => void;
};

function SkillsTab({ skillData, saveFunction, cancelFunction }: Props) {
  function mapData(dataArr: SkillData[]) {
    {
      return dataArr.map((currentObj: SkillData) => {
        const [isCollapsed, setIsCollapsed] = useState(false);
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
                  {isCollapsed ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={isCollapsed}>
                {currentObj.subItemsAreSkills
                  ? mapSkills(
                      skillData
                        .filter((obj: SkillData) => currentObj.id === obj.parentId)
                        .sort(sortBySkill),
                    )
                  : null}
              </Collapse>
            </List>
            <Collapse in={isCollapsed}>
              {!currentObj.subItemsAreSkills
                ? mapData(
                    skillData
                      .filter((obj: SkillData) => obj.parentId === currentObj.id)
                      .sort(sortBySkill),
                  )
                : null}
            </Collapse>
          </>
        );
      });
    }
  }

  function mapSkills(arr: SkillData[]) {
    return arr.map((obj: SkillData) => <SkillListItem skillObj={obj} key={obj.id} />);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <ViewButtons saveFunction={saveFunction} cancelFunction={cancelFunction} />
      </Box>
      <Box sx={{ width: '1176px', marginTop: '100px' }}>
        {mapData(skillData.filter((obj: SkillData) => obj.parentId === null))}
      </Box>
    </>
  );
}

export default SkillsTab;

// pervadint failus: skillsTabData i skillsTab, o skillsTab i skillsTabIterator ar kazkas tokio
