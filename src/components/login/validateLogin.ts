import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormInputs {
  email: string;
  password: string;
}

const emailValidationRules = {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};


const passwordValidationRules = {
  required: true,
  pattern: /^\S+$/
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  const formSubmithandler: SubmitHandler<FormInputs> = (data: FormInputs) => {
    axios.post(`${process.env.REACT_APP_API_URL}`+'/login', data)
    .then(response=>
      {console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    console.log('form data', data);
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
    passwordValidationRules,
    emailValidationRules,
    formSubmithandler,
    handleEmailChange,
    handlePasswordChange,
  };
};
