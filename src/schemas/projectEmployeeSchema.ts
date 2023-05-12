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
  datesInProjectActivityPeriod: yup
    .string()
    .test(
      'datesInProjectActivityPeriod',
      'Team member activity dates should be within the project activity period',
      (_, context) => {
        const projectStartDateValue = context.from?.[1].value.startDate;
        const projectEndDateValue = context.from?.[1].value.endDate;

        const validProjectDates =
          projectStartDateValue &&
          projectStartDateValue !== 'Invalid Date' &&
          (!projectEndDateValue ||
            (projectEndDateValue !== 'Invalid Date' && dayjs(projectStartDateValue) <= dayjs(projectEndDateValue)));

        if (!validProjectDates) {
          return true;
        }

        const projectEmployeeStartDate = context.parent.projectEmployeeStartDate;
        const projectEmployeeEndDate = context.parent.projectEmployeeEndDate;
        const projectStartDate = dayjs(projectStartDateValue);
        const projectEndDate = projectEndDateValue ? dayjs(projectEndDateValue) : undefined;

        if (!projectEmployeeStartDate) {
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
