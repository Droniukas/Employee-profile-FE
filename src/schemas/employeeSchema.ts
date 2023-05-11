import * as yup from 'yup';

import { EmployeeStatus } from '../components/employeeForm/employeeStatus';

const MAX_FILE_SIZE = 5242880; //5MB

export const employeeSchema = yup.object({
  name: yup.string().required('Field is required'),
  surname: yup.string().required('Field is required'),
  middleName: yup.string(),
  titleId: yup.number().required('Field is required'),
  status: yup.mixed<EmployeeStatus>().oneOf(Object.values(EmployeeStatus)).required('Field is required'),
  isManager: yup.boolean().required(),
  email: yup.string().required('Field is required'),
  password: yup
    .string()
    .required('Field is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain one lower case letter (a-z), upper case letter (A-Z) and number (0-9)',
    ),
  image: yup
    .mixed()
    .test('fileType', 'Invalid file type', (value) => {
      const file = value as File;
      return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type);
    })
    .test('fileSize', 'Image must be 5MB or less', (value) => {
      const file = value as File;
      return file.size <= MAX_FILE_SIZE;
    })
    .required('Field is required'),
});
