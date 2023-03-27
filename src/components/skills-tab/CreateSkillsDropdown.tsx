import React from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { get } from 'lodash'
import SkillsMatrix from './models/SkillsMatrix.interface'
import Categories from './models/Categories.interface'

export default function CreateSkillsDropdown(
  skillsListPath: string,
  categoryKeyForUseState: string,
  skillsMatrixObj: SkillsMatrix,
  categoriesState: Categories,
) {
  // path ending in .skillsList
  if (Array.isArray(get(skillsMatrixObj, skillsListPath))) {
    return get(skillsMatrixObj, skillsListPath).map((skillItemName: string) => {
      return (
        <>
          <Collapse in={get(categoriesState, categoryKeyForUseState)}>
            <ListItem disablePadding sx={{ marginLeft: '27px' }}>
              <FormControlLabel control={<Checkbox defaultValue={'false'} />} label='' />
              <ListItemText
                primary={skillItemName}
                sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px' }}
              ></ListItemText>
            </ListItem>
          </Collapse>
        </>
      )
    })
  }
}
