import { Collapse, List, ListItemButton, ListItemText, Tooltip } from '@mui/material'
import { useState } from 'react'
import { SkillLevel } from '../models/enums/SkillLevel'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { setSavedSkills } from '../../../features/savedSkills'
import { useDispatch, useSelector } from 'react-redux'
import { SavedSkillsDataRoot } from '../../../store/types'
import LevelDropdownFieldItem from './LevelDropdownFieldItem'
import { SkillLevelTooltip } from '../models/enums/SkillLevelTooltip'
import { SkillData } from '../models/interfaces/SkillData.interface'

type Props = {
  skillLevel: SkillLevel | null
  setSkillLevel: React.Dispatch<React.SetStateAction<SkillLevel>>
  skillObj: SkillData
  tooltipText: string
}

function LevelDropdownField({ skillLevel, setSkillLevel, skillObj, tooltipText }: Props) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  const savedSkills = useSelector((state: SavedSkillsDataRoot) => state.savedSkills.value)
  const dispatch = useDispatch()

  function onDropdownChange(selectedSkill: SkillLevel) {
    setSkillLevel(selectedSkill)
    dispatch(
      setSavedSkills([
        ...savedSkills.filter((item) => item.id !== skillObj.id),
        { id: skillObj.id, skill: skillObj.skill, checked: true, skillLevel: selectedSkill },
      ]),
    )
  }

  return (
    <>
      <List
        sx={{
          ...(skillObj.hasError
            ? {
                maxWidth: 150,
                marginRight: 5,
                marginBottom: 0,
                border: 1,
                width: '50%',
                backgroundColor: '#ffefef',
                color: '#ef4349',
              }
            : {
                maxWidth: 150,
                marginRight: 5,
                marginBottom: 0,
                border: 1,
                width: '50%',
                borderColor: 'primary.main',
                color: 'primary.main',
              }),
        }}
        disablePadding
      >
        <Tooltip title={tooltipText} disableInteractive>
          <ListItemButton onClick={handleClick} sx={{ height: 1 }}>
            <ListItemText primary={skillLevel} sx={{ margin: 0 }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding sx={{ margin: 0 }}>
            {[SkillLevel.BASIC, SkillLevel.INTERMEDIATE, SkillLevel.EXPERT].map(
              (skillLevelName) => {
                let tooltipText: string
                switch (skillLevelName) {
                  case SkillLevel.BASIC:
                    tooltipText = SkillLevelTooltip.BASIC
                    break
                  case SkillLevel.INTERMEDIATE:
                    tooltipText = SkillLevelTooltip.INTERMEDIATE
                    break
                  case SkillLevel.EXPERT:
                    tooltipText = SkillLevelTooltip.EXPERT
                    break
                  default:
                    tooltipText = ''
                }
                function handleSkillSelection() {
                  setSkillLevel(skillLevelName)
                  setOpen(!open)
                  onDropdownChange(skillLevelName)
                }
                if (skillLevelName === skillLevel) return null
                return (
                  <LevelDropdownFieldItem
                    onSelection={handleSkillSelection}
                    primaryText={skillLevelName}
                    key={skillLevelName}
                    tooltipTitle={tooltipText}
                  />
                )
              },
            )}
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default LevelDropdownField
