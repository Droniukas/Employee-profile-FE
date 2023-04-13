import LoginInterface from '../models/Login.interface';
import axios from './axios';

export class LoginService {
  public async checkCredentials(data: LoginInterface) {
    const response = await axios
      .post('/user/get', data)
      .then((response) => {
        if (response.status === 200) {
          return data;
        }
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
