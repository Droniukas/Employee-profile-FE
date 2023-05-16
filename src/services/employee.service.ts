import { FormikValues } from 'formik';
import qs from 'qs';

import CreateEmployeeDto from '../dtos/CreateEmployeeDto.interface';
import axios from './axios';

export class EmployeeService {
  public async searchByNameSkillsAchievements(
    searchValue: string,
    skills: number[],
    achievements: number[],
    page: number,
    size: number,
    isLimited?: boolean,
  ) {
    const response = await axios.get('/employee/search', {
      params: {
        name: searchValue,
        skills: skills,
        achievements: achievements,
        page: page,
        size: size,
        isLimited: isLimited,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'comma' });
      },
    });
    return response.data;
  }

  public async getById(id: string) {
    const response = await axios.get(`/employee/get/${id}`);
    return response.data;
  }

  public async getLoggedInUser() {
    const response = await axios.get(`/users/me`, {});
    return response.data;
  }

  public async validateEmail(email: string) {
    const response = await axios.get(`/users/validateEmail/${email}`);
    return response.data;
  }

  public async createEmployee(values: FormikValues) {
    const base64Image = await fileToBase64(values.image);

    const employee: CreateEmployeeDto = {
      name: values.name,
      surname: values.surname,
      middleName: values.middleName,
      titleId: values.titleId,
      status: values.status,
      isManager: values.isManager,
      email: values.email,
      password: values.password,
      image: {
        name: values.image.name,
        type: values.image.type,
        bytes: base64Image.split(',')[1],
      },
    };

    const response = await axios.post(`/employee`, employee);
    return response.data;
  }
}

const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(file);
    reader.onerror = reject;
  });
};
