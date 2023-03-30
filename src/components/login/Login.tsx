import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {  useForm, SubmitHandler } from 'react-hook-form';
import { useLoginForm } from './validateLogin';


interface FormInputs {
    email: string;
    password: string;
}

const Login: FC = () => {
    const {
        register,
        handleSubmit,
        control,
        errors,
        passwordValidationRules,
        emailValidationRules,
        isEmailEmpty,
        isPasswordEmpty,
        formSubmithandler,
        handleEmailChange,
        handlePasswordChange,
      } = useLoginForm();

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
                <Box component="form" onSubmit={handleSubmit(formSubmithandler)}>
                    <Box component="div" sx={{ my: 2 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                                Email address
                            </Typography>
                        </InputLabel>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder='e.g., name@cognizant.com'
                            required
                            id="email"
                            autoComplete="email"
                            {...register('email', emailValidationRules)}
                            error={!!errors.email}
                            helperText={
                                isEmailEmpty || errors.email ? 
                                  errors.email?.type === 'pattern'
                                    ? 'Email address should be in the format username@domain.com'
                                    : ''
                                  : null
                              }
                            onChange={handleEmailChange}
                            sx={{
                                '& fieldset': {
                                    borderRadius: 2
                                }
                            }}
                        />
                    </Box>
                    <Box component="div" sx={{ my: 2 }}>
                        <InputLabel sx={{
                            pb: 1,
                            color: 'primary.main'
                        }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 400 }} >
                                Password
                            </Typography >
                        </InputLabel>
                        <TextField fullWidth
                            size="small"
                            variant="outlined"
                            required
                            id="password"
                            type='password'
                            autoComplete="current-password"
                              {...register('password', passwordValidationRules)}
                            error={!!errors?.password}
                            helperText={errors.password ? errors.password.message : ''}
                            onChange={handlePasswordChange}
                            sx={{'& fieldset': {borderRadius: 2,}}}
                        />
                        <Link href="#">
                            <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 1 }}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{ my: 4 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isEmailEmpty || isPasswordEmpty}
                            sx={{ my: 1 }}
                            
                        >
                            Sign in
                        </Button>
                        <Divider sx={{
                            my: 1,
                            '&::before, &::after': {
                                borderColor: '999999',
                            },
                        }}>
                            <Typography sx={{ color: '#999999', }}>or</Typography>
                        </Divider>
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