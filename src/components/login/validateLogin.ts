import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    console.log('form data', data);
    console.log(data);
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
