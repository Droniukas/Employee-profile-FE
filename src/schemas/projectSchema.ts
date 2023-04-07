import * as yup from 'yup';

export const projectSchema = yup.object({
    title: yup.string().max(50, 'Title must not exceed 50 symbols').required('Title equired'),
    description: yup.string().max(1000, 'Title must not exceed 1000 symbols').required('Description is required'),
    startDate: yup.date().required('Required'),
    endDate: yup.date().optional()
})