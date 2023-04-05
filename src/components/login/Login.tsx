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
            maxWidth: 400,
            bgcolor: 'third.main',
            justifyContent: 'center',
            direction: 'column',
            alignSelf: 'center'
        }}>
            <Stack
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Box component="div" sx={{
                    my: 10,
                    mb: 2
                }}>
                    <Typography variant='h1' sx={{
                        mt: 10,
                        height: '72px',
                        width: 253,
                        fontWeight: '400',
                        fontSize: 32,
                        fontStyle: 'Regular',
                        lineHeight: 1.25,
                        color: 'primary.main'
                    }}
                    >
                        Welcome to Employee Profile
                    </Typography>
                </Box>
                {/* Email adress input */}
                <Box component="form" sx={{}}>
                    <Box component="div" sx={{ my: 2 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 400}}>
                                Email address
                            </Typography>
                        </InputLabel>
                        <TextField fullWidth
                            size="small"
                            variant="outlined"
                            placeholder='e.g., name@cognizant.com'
                            required
                            id="email"
                            name="email"
                            autoComplete="email"
                            sx={{
                                '& fieldset': {
                                    borderRadius: 2
                                }
                            }}
                        />
                    </Box>
                    {/* Password adress input */}
                    <Box component="div" sx={{ my: 2 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 400}} >
                                Password
                            </Typography >
                        </InputLabel>
                        <TextField fullWidth
                            size="small"
                            variant="outlined"
                            required
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                '& fieldset': {
                                    borderRadius: 2,
                                }
                            }}

                        />
                        <Link href="#">
                            <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 1 }}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Box>
                    {/* Button Sign in */}
                    <Box sx={{ my: 4 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 1 }}
                        >
                            Sign in
                        </Button>
                        {/* Divider */}
                        <Divider sx={{
                            my: 1,
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
                            sx={{ bgcolor: 'secondary.main', my: 1 }}
                        >
                            Sign in with Cognizant SSO
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Box>

    );
}
export default Login;
