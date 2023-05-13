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
        const { projectEmployeeStartDate, projectEmployeeEndDate } = context.parent;
        const project = context.from?.[1].value;

        const validProjectDates =
          project.startDate &&
          project.startDate !== 'Invalid Date' &&
          (!project.endDate ||
            (project.endDate !== 'Invalid Date' && dayjs(project.startDate) <= dayjs(project.endDate)));

        if (!validProjectDates) {
          return true;
        }

        const projectStartDate = dayjs(project.startDate);
        const projectEndDate = project.endDate ? dayjs(project.endDate) : undefined;

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
