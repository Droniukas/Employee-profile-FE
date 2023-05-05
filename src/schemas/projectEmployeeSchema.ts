import * as yup from 'yup';

export const projectEmployeeSchema = yup.object({
  projectEmployeeStartDate: yup
    .date()
    .required('Start date is required')
    .test('projectEmployeeEndDate', 'Start date can not be earlier than end date', function (value) {
      const projectEmployeeEndDate = this.parent.projectEmployeeEndDate;
      if (!projectEmployeeEndDate || !value) {
        return true;
      }
      return projectEmployeeEndDate >= value;
    }),
  projectEmployeeEndDate: yup.date().nullable(),
});
