import React from 'react'
import { Box, List, ListItemButton, ListItemText, Collapse, ListItem } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { get, update } from 'lodash'
import Categories from './models/Categories.interface'
import SkillsMatrix from './models/SkillsMatrix.interface'
import CreateSkillsDropdown from './CreateSkillsDropdown'
import HandleDropdownMenu from './HandleDropdownMenu'

export default function CreateSubItemsDropdown(
  subItemsPath: string,
  categoryKeyForUseState: string,
  skillsMatrixObj: SkillsMatrix,
  indent: number,
  categoriesState: Categories,
  setCategoriesState: React.Dispatch<React.SetStateAction<Categories>>,
  categoriesStateObj: Categories,
) {
  // path ending in .subItems
  if (get(skillsMatrixObj, subItemsPath)) {
    // this takes the lenght of the path we are on and calculates the left-margin for the dropdown
    // deeper levels are indented more so the longer the path is the more indent the dropdown has
    // at the end of this function we pass it as the indent param for this function
    // foo is just a placeholder path because it's easier to understand than adding +2 to the lenght :D
    const marginLeft = (`${subItemsPath}.foo.foo`.split('.').length - 1) * 15
    return Object.keys(
      get(skillsMatrixObj, subItemsPath) ?? get(skillsMatrixObj, subItemsPath),
    ).map((deeperCategoryKey) => {
      categoriesStateObj[deeperCategoryKey] = false
      return (
        <>
          <Collapse in={get(categoriesState, `${categoryKeyForUseState}`)}>
            <List
              disablePadding
              sx={{
                border: 1,
                borderRadius: '10px',
                marginTop: '10px',
                marginBottom: '10px',
                marginLeft: `${30 + indent}px`,
                borderColor: '#DDDDDD',
                color: 'primary.main',
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    HandleDropdownMenu(deeperCategoryKey, categoriesState, setCategoriesState)
                  }}
                  style={{ height: '72px' }}
                >
                  <ListItemText
                    primary={get(skillsMatrixObj, `${subItemsPath}.${deeperCategoryKey}.name`)}
                    disableTypography
                    sx={{ fontWeight: '500' }}
                  />
                  {get(categoriesState, `${deeperCategoryKey}`) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore sx={{ transform: 'rotate(-90deg)' }} />
                  )}
                </ListItemButton>
              </ListItem>
              {CreateSkillsDropdown(
                `${subItemsPath}.${deeperCategoryKey}.skillsList`,
                deeperCategoryKey,
                skillsMatrixObj,
                categoriesState,
              )}
            </List>
            {CreateSubItemsDropdown(
              `${subItemsPath}.${deeperCategoryKey}.subItems`,
              deeperCategoryKey,
              skillsMatrixObj,
              marginLeft,
              categoriesState,
              setCategoriesState,
              categoriesStateObj,
            )}
          </Collapse>
        </>
      )
    })
  }
}
