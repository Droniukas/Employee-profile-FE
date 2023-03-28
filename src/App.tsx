import React from 'react'
import SkillsTabList from './components/skills-tab/SkillsTabList'
import { CssBaseline, Box, Tabs, Tab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { checkboxClasses } from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';
import Header from './components/header/Header'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import './App.scss'
import { yellow } from '@mui/material/colors'

function App() {
  return (
    <>
    <body>
        <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' className='img'></img>
        <main>
          <Header />
          <Main />
        </main>

        <footer>
           <Footer />
        </footer>
    </body>
   
    
    </>
  )
}

export default App
