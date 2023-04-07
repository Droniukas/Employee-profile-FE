import LoginInterface from '../models/Login.interface';
import axios from './axios';

export const LoginService = (data: LoginInterface) => {
  return axios.post(`${process.env.REACT_APP_API_URL}` + '/user/get', data)
    .then(response => {
      if (response.status === 200){
        return data;
      }
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};