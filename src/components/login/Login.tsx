import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const Login = () => {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'third.main',
            justifyContent: 'center',
            direction: 'column',
            alignSelf: 'center'
        }}>
            <Stack
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Box component="div">
                    <Typography variant='h1' sx={{
                        height: '72px',
                        width: 253,
                        my: 10,
                        mb: 0,
                        fontWeight: '400',
                        fontSize: '32px',
                        lineSize: '32px',
                        fontStyle: 'Regular',
                        lineHeight: '83%',
                        color: 'primary.main'
                    }}
                    >
                        Welcome to Employee Profile
                    </Typography>
                </Box>
                {/* Email adress input */}
                <Box component="form">
                    <Box component="div" sx={{ py: 1 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>
                                Email address
                            </Typography>
                        </InputLabel>
                        <TextField fullWidth variant="outlined"
                            placeholder='e.g., name@cognizant.com'
                            required
                            id="email"
                            name="email"
                            autoComplete="email"
                            sx={{
                                fontSize: '14px',
                                '& fieldset': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                    </Box>
                    {/* Password adress input */}
                    <Box component="div" sx={{ py: 1 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>
                                Password
                            </Typography >
                        </InputLabel>
                        <TextField fullWidth variant="outlined"
                            required
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                fontSize: '14px',
                                '& fieldset': {
                                    borderRadius: 2,
                                }
                            }}

                        />
                        <Link href="#" >
                            Forgot password?
                        </Link>
                    </Box>
                    {/* Button Sign in */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"

                        sx={{ fontWeight: '600', textTransform: 'none', borderRadius: '16px', mt: 3, mb: 2 }}
                    >
                        Sign in
                    </Button>
                    {/* Divider */}
                    <Divider sx={{
                        '&::before, &::after': {
                            borderColor: '999999',
                        },
                    }}>
                        <Typography sx={{ color: '#999999', }}>or</Typography>
                    </Divider>
                    {/* Button Cognizant SSO */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="text"
                        sx={{ fontWeight: '600', textTransform: 'none', borderRadius: '16px', mt: 3, mb: 2, bgcolor: 'secondary.main' }}
                    >
                        Sign in with Cognizant SSO
                    </Button>
                </Box>
            </Stack>
        </Box>
        
    );
}
export default Login;
