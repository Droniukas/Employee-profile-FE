import './App.css'
import Login from './components/login/Login'
import {ThemeProvider} from '@mui/material/styles';
import Theme from './data/Theme';
import Grid from '@mui/material/Grid';
import LoginFooter from './components/login/LoginFooter';

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Grid
                container sx={{
                spacing: 0,
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Login></Login>
            </Grid>
            <LoginFooter></LoginFooter>
        </ThemeProvider>
    );
}

export default App
