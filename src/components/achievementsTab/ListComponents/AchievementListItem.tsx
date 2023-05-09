import { Box, Checkbox, checkboxClasses, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, enUS, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
// import 'dayjs/plugin/localizedFormat';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Achievement } from '../../../models/Achievement.interface';
import { setAchievementWithErrorId } from '../../../states/achievementWithErrorId';
import { updateChangedAchievement } from '../../../states/changedAchievements';
import { achievementsTabStateRoot, OnCancelRoot } from '../../../store/types/achievements';
import { UserStateRoot } from '../../../store/types/user';
import { AchievementsTabState } from '../../enums/AchievementsTabState';
import AchievementListItemErrorText from './AchievementListItemErrorText';

type AchievementListItemProps = {
  achievement: Achievement;
};

let wasChange = false;

const AchievementListItem: React.FunctionComponent<AchievementListItemProps> = (props: AchievementListItemProps) => {
  const { achievement } = props;
  const viewState = useSelector((state: achievementsTabStateRoot) => state.achievementsTabState.value);
  const [issueDate, setIssueDate] = useState<string | null>();
  const [expiringDate, setExpiringDate] = useState<string | null>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const userId = useSelector((state: UserStateRoot) => state.userState.value).id;

  const expiringDateExists: boolean = expiringDate !== undefined && expiringDate !== null;
  const issueDateExists: boolean = issueDate !== undefined && issueDate !== null;
  const achievementIssueDateExists: boolean = achievement.issueDate !== null && achievement.issueDate !== undefined;
  const achievementExpiringDateExists: boolean =
    achievement.expiringDate !== null && achievement.expiringDate !== undefined;
  const isErrorWhenDatesExists = achievement.hasError && issueDateExists && expiringDateExists;

  useEffect(() => {
    setChecked(achievement.checked);
    achievement.issueDate !== undefined ? setIssueDate(achievement.issueDate) : null;
    achievement.expiringDate !== undefined ? setExpiringDate(achievement.expiringDate) : null;
  }, [achievement.checked, achievement.issueDate, achievement.expiringDate]);

  const [endDateExists, setEndDateExists] = useState<boolean>(expiringDateExists || achievementIssueDateExists);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(achievement.checked);
    achievement.issueDate !== undefined ? setIssueDate(achievement.issueDate) : issueDate;
    achievement.expiringDate !== undefined ? setExpiringDate(achievement.expiringDate) : expiringDate;
  }, [onCancel]);

  const checkboxColor = viewState == AchievementsTabState.VIEW_STATE ? 'adaec3' : 'primary.main';

  const dispatch = useDispatch();

  const onSwitchChange = () => {
    setChecked(!isChecked);
    if (!isChecked) {
      dispatch(
        updateChangedAchievement({
          achievementId: achievement.achievementId,
          achievementName: achievement.achievementName,
          checked: true,
          issueDate: issueDate,
          expiringDate: expiringDate,
          employeeId: userId,
        }),
      );
    } else {
      if (achievement.hasError) {
        dispatch(setAchievementWithErrorId({ achievementId: achievement.achievementId }));
      }
      dispatch(
        updateChangedAchievement({
          achievementId: achievement.achievementId,
          achievementName: achievement.achievementName,
          checked: false,
          issueDate: null,
          expiringDate: null,
          employeeId: userId,
        }),
      );
    }
  };
  const onDatePickerChange = () => {
    if (achievement.hasError) {
      dispatch(setAchievementWithErrorId({ achievementId: achievement.achievementId }));
    }
    dispatch(
      updateChangedAchievement({
        achievementId: achievement.achievementId,
        achievementName: achievement.achievementName,
        checked: true,
        issueDate: issueDate,
        expiringDate: expiringDate,
        employeeId: userId,
      }),
    );
  };

  if (wasChange) {
    onDatePickerChange();
    wasChange = false;
  }

  let expiringDateMessage = '';
  if (endDateExists && achievementExpiringDateExists) {
    expiringDateMessage = dayjs(achievement.expiringDate).format('MMM, YYYY');
  } else if (endDateExists && expiringDateExists) {
    expiringDateMessage = dayjs(expiringDate).format('MMM, YYYY');
  } else {
    expiringDateMessage = 'Something wrong with the expiring date';
  }

  let issueDateMessage = '';
  if (achievement.issueDate !== undefined && achievement.issueDate !== null) {
    issueDateMessage = dayjs(achievement.issueDate).format('MMM, YYYY');
  } else if (issueDateExists) {
    issueDateMessage = dayjs(issueDate).format('MMM, YYYY');
  } else {
    issueDateMessage = 'Both are invalid';
  }

  let errorMessage = null;

  if (achievement.hasError && (issueDate === null || issueDate === undefined)) {
    errorMessage = (
      <AchievementListItemErrorText issueDateErrorMessage={'Field is required'} expiringDateErrorMessage={''} />
    );
  } else if (isErrorWhenDatesExists && dayjs(expiringDate).isBefore(dayjs(issueDate))) {
    errorMessage = (
      <AchievementListItemErrorText
        issueDateErrorMessage={''}
        expiringDateErrorMessage={'Expiring Date cannot be earlier than Issued Date.'}
      />
    );
  } else if (isErrorWhenDatesExists && dayjs(expiringDate).diff(dayjs(issueDate), 'year') < 1) {
    errorMessage = (
      <AchievementListItemErrorText
        issueDateErrorMessage={''}
        expiringDateErrorMessage={'Certificate activity period cannot be less than 1 year.'}
      />
    );
  } else {
    errorMessage = null;
  }

  // {(achievement.hasError && (issueDate === null || issueDate === undefined)) ? (
  //   <AchievementListItemErrorText issueDateErrorMessage={'Field is required'} expiringDateErrorMessage={''} />
  // ) : isErrorWhenDatesExists && dayjs(expiringDate).isBefore(dayjs(issueDate)) ? (
  //   <AchievementListItemErrorText
  //     issueDateErrorMessage={''}
  //     expiringDateErrorMessage={'Expiring Date cannot be earlier than Issued Date.'}
  //   />
  // ) : isErrorWhenDatesExists && dayjs(expiringDate).diff(dayjs(issueDate), 'year') < 1 ? (
  //   <AchievementListItemErrorText
  //     issueDateErrorMessage={''}
  //     expiringDateErrorMessage={'Certificate activity period cannot be less than 1 year.'}
  //   />
  // ) : null}
  // const localizedFormat = require('dayjs/plugin/localizedFormat');
  // dayjs.extend(localizedFormat);
  // dayjs().format('MMM, YYYY');

  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '40px', display: 'inline-block' }}>
          <FormControlLabel
            control={
              <>
                <Checkbox
                  disabled={viewState === AchievementsTabState.VIEW_STATE}
                  checked={isChecked}
                  onChange={() => {
                    onSwitchChange();
                    if (issueDate !== null) {
                      setIssueDate(null);
                    }
                    if (expiringDate !== null) {
                      setExpiringDate(null);
                    }
                  }}
                  sx={{
                    color: checkboxColor,
                    [`&.${checkboxClasses.checked}`]: {
                      color: checkboxColor,
                    },
                    marginLeft: -2,
                  }}
                />
              </>
            }
            label=""
          />
          <ListItemText
            sx={{
              fontWeight: '400',
              paddingLeft: '0px',
              marginLeft: '0px',
              color: 'primary.main',
              display: 'inline-flex',
            }}
          >
            {achievement.achievementName}
          </ListItemText>
          {viewState === AchievementsTabState.VIEW_STATE ? (
            isChecked ? (
              <>
                <Box sx={{ display: 'inline', width: '96%' }}>
                  <Box
                    sx={{
                      marginRight: '60px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: '#666666',
                        marginRight: '40px',
                        left: 0,
                      }}
                    >
                      {'Issued date: ' + issueDateMessage}
                    </ListItemText>
                    {expiringDateExists && (
                      <ListItemText
                        sx={{
                          fontWeight: '400',
                          marginRight: '40px',
                          color: '#666666',
                        }}
                      >
                        {'Expired date: ' + expiringDateMessage}
                      </ListItemText>
                    )}
                  </Box>
                </Box>
              </>
            ) : null
          ) : null}
        </ListItem>
        {viewState === AchievementsTabState.EDIT_STATE ? (
          isChecked ? (
            <>
              <Box sx={{ width: '100%', position: 'absolute' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    marginX={2}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 5,
                      '& fieldset': { border: '1px solid #DDDDDD', borderRadius: '8px', fontSize: 14 },
                      '& .MuiButtonBase-root': { color: 'primary.main' },
                      '& .MuiDatePickerToolbar-root': { backgroundColor: 'red' },
                      '& .MuiDatePickerToolbar-title': { backgroundColor: 'red' },
                      color: 'primary.main',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: '400',
                        paddingRight: 3,
                        top: -60,
                        position: 'relative',
                      }}
                    >
                      Issued date:
                    </Typography>
                    <DatePicker
                      slotProps={{
                        ...(!achievement.hasError
                          ? {
                              textField: {
                                size: 'small',
                                error: false,
                                InputLabelProps: {
                                  shrink: false,
                                },
                              },
                            }
                          : {
                              textField: {
                                size: 'small',
                                error: true,
                                InputLabelProps: {
                                  shrink: false,
                                },
                              },
                            }),
                      }}
                      disableFuture
                      format="MMM, YYYY"
                      views={['year', 'month']}
                      sx={{ width: 150, marginRight: 7, top: -60, color: 'primary.main', fontSize: 14 }}
                      value={achievementIssueDateExists ? dayjs(achievement.issueDate) : null}
                      onChange={(newValue) => {
                        setIssueDate(dayjs(newValue).format('YYYY-MM-DD'));
                        wasChange = true;
                        if (achievement.hasError) {
                          achievement.hasError = false;
                        }
                      }}
                      label={issueDateExists && !wasChange ? '' : 'Mon, YYYY'}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 400, paddingRight: 3, top: -60, position: 'relative' }}>
                      Expired date:
                    </Typography>
                    <Box sx={{ my: 1 }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        // adapterLocale={en}
                        localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
                      >
                        <DatePicker
                          // onKeyDown={(e) => {
                          //   e.preventDefault();
                          // }}
                          // disabled
                          // disableToolbar
                          // autoFocus
                          slotProps={{
                            ...(achievement.hasError && issueDateExists
                              ? {
                                  toolbar: { toolbarFormat: 'MM YYYY', hidden: false, toolbarPlaceholder: null },
                                  field: {
                                    // defaultValue: '',
                                    // value: '',
                                    label: '',
                                  },
                                  InputAdornment: {
                                    FormControlLabel: '',
                                  },
                                  localeText: { clearButtonLabel: 'test' },
                                  textField: {
                                    size: 'small',
                                    error: true,
                                    InputLabelProps: {
                                      shrink: false,
                                      placeholder: ' ',
                                      // label: 'aa',
                                    },
                                    InputProps: {
                                      readOnly: true,
                                      placeholder: ' ',
                                      label: ' ',
                                    },
                                    value: ' ',
                                  },
                                }
                              : {
                                  textField: {
                                    size: 'small',
                                    error: false,
                                    InputLabelProps: {
                                      shrink: false,
                                    },
                                  },
                                }),
                          }}
                          sx={{ width: 150, top: -60, color: 'rgba(0, 0, 72, 0.37)' }}
                          format="MMM, YYYY"
                          views={['year', 'month']}
                          minDate={dayjs(issueDate).add(1, 'year')}
                          value={endDateExists && expiringDate !== null ? dayjs(expiringDate) : null}
                          onChange={(newValue) => {
                            // newValue.preventDefault();
                            setExpiringDate(dayjs(newValue).format('YYYY-MM-DD'));
                            wasChange = true;
                            setEndDateExists(true);
                          }}
                          label={endDateExists && expiringDate && !wasChange ? '' : 'Mon, YYYY'}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </LocalizationProvider>
              </Box>
            </>
          ) : null
        ) : null}
        <Box sx={{ right: 0, position: 'relative' }}>
          {errorMessage}
          {/* {(achievement.hasError && (issueDate === null || issueDate === undefined)) ? (
            <AchievementListItemErrorText issueDateErrorMessage={'Field is required'} expiringDateErrorMessage={''} />
          ) : isErrorWhenDatesExists && dayjs(expiringDate).isBefore(dayjs(issueDate)) ? (
            <AchievementListItemErrorText
              issueDateErrorMessage={''}
              expiringDateErrorMessage={'Expiring Date cannot be earlier than Issued Date.'}
            />
          ) : isErrorWhenDatesExists && dayjs(expiringDate).diff(dayjs(issueDate), 'year') < 1 ? (
            <AchievementListItemErrorText
              issueDateErrorMessage={''}
              expiringDateErrorMessage={'Certificate activity period cannot be less than 1 year.'}
            />
          ) : null} */}
        </Box>
      </Box>
    </>
  );
};

export default AchievementListItem;
