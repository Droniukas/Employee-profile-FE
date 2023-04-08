import Login from './components/login/Login'
import { ThemeProvider } from '@mui/material/styles'
import theme from './data/theme'
import SkillsTabData from './components/skillsTab/SkillsTabData'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SkillsTabData />
      </ThemeProvider>
    </>
  )
}

export default App
