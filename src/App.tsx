import './App.css'
import Login from './components/login/Login'
import { createMuiTheme, ThemeProvider } from '@mui/material';

const theme = createMuiTheme ({
  palette: {
      primary : {
        main: '#000048'
      },
      secondary : {
        main: '#78ECE8'
      }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Login></Login>
    </ThemeProvider>
  );
}

export default App
