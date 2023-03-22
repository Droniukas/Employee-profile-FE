import React from 'react'
import SkillsTabList from './components/skills-tab/SkillsTabList'
import { CssBaseline, Box, Tabs, Tab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { checkboxClasses } from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' style={{
                position: 'absolute',
                top: 1,
                left: 0,
                width: 1900,
                height: 1900,
                opacity: '5%'
      }}></img>

        <Header />
        <Main />
        <Footer />
    </>
  )
}

export default App
