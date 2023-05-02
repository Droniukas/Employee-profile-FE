import * as yup from 'yup';

import { projectEmployeeSchema } from './projectEmployeeSchema';

export const projectSchema = yup.object({
  title: yup.string().max(50, 'Title must not exceed 50 symbols').required('Title is required'),
  description: yup.string().max(1000, 'Title must not exceed 1000 symbols').required('Description is required'),
  startDate: yup.date().required('Start date is required'),
  projectEmployees: yup.array().of(projectEmployeeSchema),
});
