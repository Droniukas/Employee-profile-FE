import dayjs from 'dayjs';
import * as yup from 'yup';

export const projectEmployeeSchema = (projectStartDate: string, projectEndDate: string) =>
  yup.object({
    projectEmployeeStartDate: yup
      .date()
      .required('Start date is required')
      .typeError('Invalid date')
      .test(
        'startDateBeforeEndDate',
        'Start date can not be earlier than end date',
        function (projectEmployeeStartDate) {
          const projectEmployeeEndDate = this.parent.projectEmployeeEndDate;
          if (!projectEmployeeEndDate || !dayjs(projectEmployeeEndDate).isValid() || !projectEmployeeStartDate) {
            return true;
          }
          return projectEmployeeStartDate <= projectEmployeeEndDate;
        },
      ),
    projectEmployeeEndDate: yup.date().nullable().typeError('Invalid date'),
    projectEmployeeActivityDates: yup
      .date()
      .test(
        'datesInProjectActivityPeriod',
        'Team member activity dates should be within the project activity period',
        function () {
          return validateActivityDates(
            dayjs(projectStartDate).isValid() ? dayjs(projectStartDate).toDate() : undefined,
            dayjs(projectEndDate).isValid() ? dayjs(projectEndDate).toDate() : undefined,
            this.parent.projectEmployeeStartDate,
            this.parent.projectEmployeeEndDate,
          );
        },
      ),
  });

const validateActivityDates = (
  projectStartDate?: Date,
  projectEndDate?: Date,
  projectEmployeeStartDate?: Date,
  projectEmployeeEndDate?: Date,
) => {
  if (
    !projectEmployeeStartDate ||
    !projectStartDate ||
    !dayjs(projectEmployeeStartDate).isValid() ||
    !dayjs(projectEmployeeEndDate).isValid() ||
    (projectEmployeeEndDate && projectEmployeeEndDate < projectEmployeeStartDate)
  ) {
    return true;
  } else if (
    projectEmployeeStartDate < projectStartDate ||
    (projectEndDate && projectEmployeeEndDate && projectEmployeeEndDate > projectEndDate) ||
    (projectEndDate && !projectEmployeeEndDate)
  ) {
    return false;
  }
  return true;
};
