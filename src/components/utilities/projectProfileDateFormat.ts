import moment from 'moment';

export const projectProfileDateFormat = (date: string) => {
  return date === null ? null : moment(date).format('YYYY/MM/DD');
};
