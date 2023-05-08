import { Box, Checkbox, checkboxClasses, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '@mui/icons-material/Event';

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

  const expiringDateMessage =
    endDateExists && achievementExpiringDateExists
      ? dayjs(achievement.expiringDate).format('MMM YYYY')
      : endDateExists && expiringDateExists
      ? dayjs(expiringDate).format('MMM YYYY')
      : '';

  const issueDateMessage =
    achievement.issueDate !== undefined && achievement.issueDate !== null
      ? dayjs(achievement.issueDate).format('MMM, YYYY')
      : endDateExists && expiringDateExists
      ? dayjs(issueDate).format('MMM YYYY')
      : 'Both are invalid';
  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '40px', display: 'inline-block' }}>
          <FormControlLabel
            control={
              <>
                {/* <StyledSwitch
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
                    m: 1,
                    '& .MuiSwitch-track': {
                      backgroundColor:
                        viewState == AchievementsTabState.VIEW_STATE ? 'grey' : 'rgba(120, 236, 232, 0.4)',
                    },
                  }}
                /> */}
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
                      // width: '500px',
                      // display: 'inline-flex',
                      // position: 'absolute',
                      // right: '0px',
                      // backgroundColor: 'red',
                      display: 'inline-flex',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <ListItemText
                      sx={{
                        // fontWeight: '200',
                        color: '#666666',
                        // display: 'inline-block',
                        marginRight: '40px',
                        // textAlign: 'right',
                      }}
                    >
                      {/* {achievement.issueDate !== undefined && achievement.issueDate !== null
                        ? 'Issued date:   ' + dayjs(achievement.issueDate).format('MMM, YYYY')
                        : issueDate !== undefined && issueDate !== null
                        ? 'Issued date:   ' + dayjs(issueDate).format('MMM, YYYY')
                        : 'Both are invalid'} */}
                      {'Issued date: ' + issueDateMessage}
                    </ListItemText>
                    {expiringDateExists && (
                      <ListItemText
                        sx={{
                          fontWeight: '400',
                          marginRight: '40px',
                          color: '#666666',
                          // display: 'inline-block',
                          // textAlign: 'right',
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
                      '& fieldset': { border: '1px solid #DDDDDD', borderRadius: '15px', fontSize: 14 },
                      '& .MuiButtonBase-root': { color: 'primary.main' },
                      [`${achievement.hasError}`]: {
                        '& fieldset': { border: '1px solid red', borderRadius: '15px', fontSize: 14 },
                      },
                      color: 'primary.main',
                      // my: 2.5,
                      // paddingLeft: 9,
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
                      // slots={{
                      //   openPickerIcon: pickersCalendarHeaderClasses
                      // }}
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
                                  endAdornment: <Calendar />,
                                },
                                // sx: {
                                //   '& fieldset': { borderColor: 'primary.main', borderRadius: '15px' },
                                // },
                                // '& fieldset': {
                                //   }
                                // },
                                // sx={{
                                // }},
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
                      // label={'MON, YYYY'}
                      format="MMM, YYYY"
                      views={['month', 'year']}
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
                    {/* <Checkbox
                      checked={endDateExists}
                      onChange={(e) => {
                        endDateExists ? setExpiringDate(null) : {};
                        setEndDateExists(e.target.checked);
                        wasChange = true;
                      }}
                      sx={{ paddingRight: 1 }}
                    /> */}
                    <Typography sx={{ fontSize: 14, fontWeight: 400, paddingRight: 3, top: -60, position: 'relative' }}>
                      Expired date:
                    </Typography>
                    {
                      /* endDateExists */ true && (
                        <Box sx={{ my: 1 }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              slotProps={{
                                ...(achievement.hasError && issueDateExists
                                  ? {
                                      textField: {
                                        size: 'small',
                                        error: true,
                                        InputLabelProps: {
                                          shrink: false,
                                        },
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
                              // label="Basic date picker"
                              // placeholder: 'Placeholder',
                              // defaultValue={format(MMM, YYYY)}
                              // inputFormat="MM/DD/YYYY"
                              format="MMM, YYYY"
                              views={['month', 'year']}
                              minDate={dayjs(issueDate).add(1, 'year')}
                              // value={
                              //   endDateExists && expiringDate !== null
                              //     ? dayjs(expiringDate)
                              //     : dayjs(issueDate).add(1, 'year')
                              // }
                              //value={endDateExists ? dayjs(expiringDate) : null}
                              value={endDateExists && expiringDate !== null ? dayjs(expiringDate) : null}
                              onChange={(newValue) => {
                                setExpiringDate(dayjs(newValue).format('YYYY-MM-DD'));
                                wasChange = true;
                                setEndDateExists(true);
                              }}
                              label={endDateExists && expiringDate && !wasChange ? '' : 'Mon, YYYY'}
                            />
                          </LocalizationProvider>
                        </Box>
                      )
                    }
                  </Box>
                </LocalizationProvider>
              </Box>
            </>
          ) : null
        ) : null}
        <Box sx={{ right: 0, position: 'relative' }}>
          {achievement.hasError && (issueDate === null || issueDate === undefined) ? (
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
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default AchievementListItem;
