import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosHeaders } from 'axios';
import {LoginService } from '../../../services/login.service';
import LoginInterface from '../../../models/Login.interface';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInterface>();
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const navigate = useNavigate();

  const formSubmithandler: SubmitHandler<LoginInterface> = async (data: LoginInterface) => {
    try {
      const responseData = await LoginService(data);
    } catch (error) {
      console.log(error);
      console.log(LoginService(data));
      
    }
  };
  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailEmpty(event.target.value === '');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordEmpty(event.target.value === '');
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isEmailEmpty,
    isPasswordEmpty,
    formSubmithandler,
    handleEmailChange,
    handlePasswordChange,
  };
};
