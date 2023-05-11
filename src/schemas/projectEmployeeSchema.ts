import dayjs from 'dayjs';
import * as yup from 'yup';

export const projectEmployeeSchema = yup.object({
  projectEmployeeStartDate: yup
    .date()
    .required('Start date is required')
    .typeError('Invalid date')
    .test('startDateBeforeEndDate', 'Start date can not be earlier than end date', function (projectEmployeeStartDate) {
      const projectEmployeeEndDate = this.parent.projectEmployeeEndDate;
      if (!projectEmployeeEndDate || !dayjs(projectEmployeeEndDate).isValid() || !projectEmployeeStartDate) {
        return true;
      }
      return projectEmployeeStartDate <= projectEmployeeEndDate;
    }),
  projectEmployeeEndDate: yup.date().nullable().typeError('Invalid date'),
  datesInActivityPeriod: yup
    .string()
    .test(
      'datesInProjectActivityPeriod',
      'Team member activity dates should be within the project activity period',
      (_, context) => {
        const projectEmployeeStartDate = context.parent.projectEmployeeStartDate;
        const projectEmployeeEndDate = context.parent.projectEmployeeEndDate;
        const projectStartDate = context.from?.[1].value.startDate
          ? dayjs(context.from?.[1].value.startDate)
          : undefined;
        const projectEndDate = context.from?.[1].value.endDate ? dayjs(context.from?.[1].value.endDate) : undefined;

        if (!projectEmployeeStartDate || !projectStartDate || (projectEndDate && projectEndDate < projectStartDate)) {
          return true;
        } else if (
          projectEmployeeStartDate < projectStartDate ||
          (projectEndDate && projectEmployeeEndDate && projectEmployeeEndDate > projectEndDate) ||
          (projectEndDate && !projectEmployeeEndDate)
        ) {
          return false;
        }
        return true;
      },
    ),
});
