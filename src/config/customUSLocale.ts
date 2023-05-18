import { getPickersLocalization } from '@mui/x-date-pickers/locales/utils/getPickersLocalization';
import { PickersLocaleText } from '@mui/x-date-pickers/locales/utils/pickersLocaleTextApi';

// This object is not Partial<PickersLocaleText> because it is the default values

export const customUSLocale: PickersLocaleText<any> = {
  // Calendar navigation
  previousMonth: 'Previous month',
  nextMonth: 'Next month',

  // View navigation
  openPreviousView: 'open previous view',
  openNextView: 'open next view',
  calendarViewSwitchingButtonAriaLabel: (view: string) =>
    view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view',

  // DateRange placeholders
  start: 'Start',
  end: 'End',

  // Action bar
  cancelButtonLabel: 'Cancel',
  clearButtonLabel: 'Clear',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Today',

  // Toolbar titles
  datePickerToolbarTitle: 'Select date',
  dateTimePickerToolbarTitle: 'Select date & time',
  timePickerToolbarTitle: 'Select time',
  dateRangePickerToolbarTitle: 'Select date range',

  // Clock labels
  clockLabelText: (view: string, time: any, adapter: any) =>
    `Select ${view}. ${time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`}`,
  hoursClockNumberText: (hours: any) => `${hours} hours`,
  minutesClockNumberText: (minutes: any) => `${minutes} minutes`,
  secondsClockNumberText: (seconds: any) => `${seconds} seconds`,

  // Digital clock labels
  // selectViewText: (view: any) => `Select ${view}`,

  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Week number',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: (weekNumber: any) => `Week ${weekNumber}`,
  calendarWeekNumberText: (weekNumber: any) => `${weekNumber}`,

  // Open picker labels
  openDatePickerDialogue: (value: any, utils: any) =>
    value !== null && utils.isValid(value)
      ? `Choose date, selected date is ${utils.format(value, 'fullDate')}`
      : 'Choose date',
  openTimePickerDialogue: (value: any, utils: any) =>
    value !== null && utils.isValid(value)
      ? `Choose time, selected time is ${utils.format(value, 'fullTime')}`
      : 'Choose time',

  // Table labels
  timeTableLabel: 'pick time',
  dateTableLabel: 'pick date',

  // Field section placeholders
  fieldYearPlaceholder: (params: any) => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: (params: any) => (params.contentType === 'letter' ? 'Mon' : 'MM'),
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: (params: any) => (params.contentType === 'letter' ? 'EEEE' : 'EE'),
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',
};

export const DEFAULT_LOCALE = customUSLocale;

export const enUS = getPickersLocalization(customUSLocale);
