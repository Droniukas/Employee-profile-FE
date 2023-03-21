import './App.css'
import Login from './components/login/Login'
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Footer from './components/login/Footer';

const theme = createMuiTheme ({
  typography: {
    fontFamily: ['Inter', 'sans-serif'
  ].join(','),
  fontSize: 14,
  button: { 
    fontWeight: 600,
    textTransform: 'none',
  },

},

  palette: {
      primary : {
        main: '#000048'
      },
      secondary : {
        main: '#78ECE8'
      }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',  
        },
      },
    }, 
  },

});

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
