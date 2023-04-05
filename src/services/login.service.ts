import axios from 'axios';
interface FormInputs {
    email: string;
    password: string;
  }

export const LoginService = (data: FormInputs) => {
  return axios.post(`${process.env.REACT_APP_API_URL}` + '/user/get', data)
    .then(response => {
      if (response.status === 200){
        const redirectUrl = response.data.redirectUrl;
        window.location.href = redirectUrl;
      }
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};