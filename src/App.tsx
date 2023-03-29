import './App.css'
import Login from './components/login/Login';
import {ThemeProvider} from '@mui/material/styles';
import theme from './config/theme';
import Grid from '@mui/material/Grid';
import Footer from './components/login/Footer';

function App() {
  return ( 
    <ThemeProvider theme={theme}>
    <Grid
  container sx={{
  spacing:0,
  direction:'column',
  alignItems:'center',
  justifyContent:'center'
}}
>  
    <Login></Login>
    </Grid>
    <Footer></Footer>
    </ThemeProvider>
  );
}

export default App
