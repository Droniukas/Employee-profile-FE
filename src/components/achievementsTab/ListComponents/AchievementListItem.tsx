import {
  Box,
  Checkbox,
  checkboxClasses,
  FormControlLabel,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIcon from '@mui/icons-material/Event';

import { customUSLocale } from '../../../config/customUSLocale';
import { Achievement } from '../../../models/Achievement.interface';
import { setAchievementWithErrorId } from '../../../states/achievementWithErrorId';
import { updateChangedAchievement } from '../../../states/changedAchievements';
import { achievementsTabStateRoot, OnCancelRoot } from '../../../store/types/achievements';
import { UserStateRoot } from '../../../store/types/user';
import { AchievementsTabState } from '../../enums/AchievementsTabState';
import AchievementExpiringDateErrorText from './AchievementExpiringDateErrorText';
import AchievementIssueDateErrorText from './AchievementIssueDateErrorText';

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

  const renderErrors = () => {
    if (achievement.hasError && (issueDate === null || issueDate === undefined)) {
      return <AchievementIssueDateErrorText />;
    }
    if (isErrorWhenDatesExists && dayjs(expiringDate).isBefore(dayjs(issueDate))) {
      return (
        <AchievementExpiringDateErrorText
          expiringDateErrorMessage={'Expiring Date cannot be earlier than Issued Date.'}
        />
      );
    }
    if (isErrorWhenDatesExists && dayjs(expiringDate).diff(dayjs(issueDate), 'year') < 1) {
      return (
        <AchievementExpiringDateErrorText
          expiringDateErrorMessage={'Certificate activity period cannot be less than 1 year.'}
        />
      );
    }
    return null;
  };

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
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="us" localeText={customUSLocale}>
                  <Box
                    marginX={2}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 5,
                      '& fieldset': { border: '1px solid #DDDDDD', borderRadius: '8px', fontSize: 14 },
                      '& .MuiButtonBase-root': { color: 'primary.main' },
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
                    <MobileDatePicker
                      slotProps={{
                        ...(!achievement.hasError
                          ? {
                              textField: {
                                size: 'small',
                                error: false,
                                InputLabelProps: {
                                  shrink: false,
                                },
                                InputProps: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton edge="end">
                                        <EventIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
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
                                InputProps: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton edge="end">
                                        <EventIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                },
                              },
                            }),
                      }}
                      disableFuture
                      format="MMM, YYYY"
                      views={['year', 'month']}
                      sx={{ width: 150, marginRight: 7, top: -60, color: 'red', fontSize: 14 }}
                      value={achievementIssueDateExists ? dayjs(achievement.issueDate) : null}
                      onChange={(newValue) => {
                        newValue === null
                          ? setExpiringDate(null)
                          : setExpiringDate(dayjs(newValue).format('YYYY-MM-DD'));
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
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="us" localeText={customUSLocale}>
                        <MobileDatePicker
                          slotProps={{
                            ...(achievement.hasError && issueDateExists
                              ? {
                                  textField: {
                                    size: 'small',
                                    error: true,
                                    InputLabelProps: {
                                      shrink: false,
                                    },
                                    InputProps: {
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton edge="end">
                                            <EventIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    },
                                  },
                                  actionBar: {
                                    actions: ['clear', 'cancel', 'accept'],
                                  },
                                }
                              : {
                                  textField: {
                                    size: 'small',
                                    error: false,
                                    InputLabelProps: {
                                      shrink: false,
                                    },
                                    InputProps: {
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton edge="end">
                                            <EventIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    },
                                  },
                                  actionBar: {
                                    actions: ['clear', 'cancel', 'accept'],
                                  },
                                }),
                          }}
                          sx={{ width: 150, top: -60, color: 'red' }}
                          format="MMM, YYYY"
                          views={['year', 'month']}
                          minDate={dayjs(issueDate).add(1, 'year')}
                          value={endDateExists && expiringDate !== null ? dayjs(expiringDate) : null}
                          onChange={(newValue) => {
                            newValue === null
                              ? setExpiringDate(null)
                              : setExpiringDate(dayjs(newValue).format('YYYY-MM-DD'));
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
        <Box sx={{ right: 0, position: 'relative' }}>{renderErrors()}</Box>
      </Box>
    </>
  );
};

export default AchievementListItem;
