import { ListItemText } from '@mui/material'
import React from 'react'

function SkillListItemErrorText() {
  return (
    <ListItemText
      disableTypography
      sx={{ fontSize: 15, color: '#ef4349' }}
      primary='Skill level should be defined for the selected skill'
    />
  )
}

export default SkillListItemErrorText
