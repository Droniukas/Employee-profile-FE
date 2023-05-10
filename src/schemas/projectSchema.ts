import dayjs from 'dayjs';
import * as yup from 'yup';

export const projectSchema = yup.object({
  title: yup.string().max(50, 'Title must not exceed 50 symbols').required('Field is required'),
  description: yup.string().max(1000, 'Title must not exceed 1000 symbols').required('Field is required'),
  startDate: yup
    .date()
    .required('Start date is required')
    .typeError('Invalid date')
    .test('startDateBeforeEndDate', 'Start date can not be earlier than end date', function (projectStartDate) {
      const projectEndDate = this.parent.endDate;
      if (!projectEndDate || !dayjs(projectEndDate).isValid() || !projectStartDate) {
        return true;
      }
      return projectStartDate <= projectEndDate;
    }),
  endDate: yup.date().nullable().typeError('Invalid date'),
});
