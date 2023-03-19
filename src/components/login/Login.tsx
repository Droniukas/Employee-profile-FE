import { Container , Typography } from '@mui/material';
const Login = () => {
    return (
        <Container sx={{bgcolor: 'secondary.main', height: '10vh'}}>
            <Typography variant='h1' sx={{
                my:4, textAlign: 'center', color: 'primary.main'}}
            >
                Welcome to Employee Profile
            </Typography>
        </Container>
    );
}
export default Login;
