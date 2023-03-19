import React from 'react'
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Box,
  Button,
  createTheme,
  colors,
  ThemeProvider,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'

export default function SkillsTab() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center'>
        {/* LIST START */}
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List>
              <ListItemButton onClick={handleClick}>
                <ListItemText>Something</ListItemText>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        {/* LIST END */}
      </Box>
    </>
  )
}
