import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const Footer = () => {
    return (
        <Box component='footer' sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            mt: 'auto'
        }}>
            <Grid container sx={{
                color: '#999999',
                mt: 'auto',
                width: '100%',
                bgcolor: 'third.main',
                justifyContent: 'center',
                direction: 'column',
                alignSelf: 'center',

            }}>
                <Grid item>
                    <Typography sx={{align: 'center', p: 2}}>Terms of Service</Typography>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Grid item>
                    <Typography sx={{align: 'center', p: 2}}>Support</Typography>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Grid item>
                    <Typography sx={{align: 'center', p: 2}}>2022 Cognization</Typography>
                </Grid>
            </Grid>
        </Box>
        );
}

export default Footer;