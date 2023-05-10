import { Box, Checkbox, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Achievement } from '../../../models/Achievement.interface';
import { setAchievementWithErrorId } from '../../../states/achievementWithErrorId';
import { updateChangedAchievement } from '../../../states/changedAchievements';
import { achievementsTabStateRoot, OnCancelRoot } from '../../../store/types/achievements';
import { UserStateRoot } from '../../../store/types/user';
import { AchievementsTabState } from '../../enums/AchievementsTabState';
import AchievementListItemErrorText from './AchievementListItemErrorText';
import { StyledSwitch } from './StyledSwitch';

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

  const certificateMessage =
    endDateExists && achievementExpiringDateExists
      ? 'Certificate:  ' + dayjs(achievement.expiringDate).format('MMM YYYY')
      : endDateExists && expiringDateExists
      ? 'Certificate:  ' + dayjs(expiringDate).format('MMM YYYY')
      : '';
  return (
    <>
      <Box>
        <ListItem disablePadding sx={{ marginLeft: '27px', minHeight: 60 }}>
          <FormControlLabel
            control={
              <>
                <StyledSwitch
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
                />
              </>
            }
            label=""
          />
          <ListItemText sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: 'primary.main' }}>
            {achievement.achievementName}
            {achievement.hasError && (issueDate === null || issueDate === undefined) ? (
              <AchievementListItemErrorText
                issueDateErrorMessage={'Issue date cannot be empty!'}
                expiringDateErrorMessage={''}
              />
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
          </ListItemText>
          {viewState === AchievementsTabState.VIEW_STATE ? (
            isChecked ? (
              <>
                <Box sx={{ marginRight: '0px', width: '400px', display: 'inline-block' }}>
                  <ListItemText
                    sx={{
                      fontWeight: '200',
                      color: '#666666',
                      display: 'inline-block',
                      marginRight: '50px',
                    }}
                  >
                    {achievement.issueDate !== undefined && achievement.issueDate !== null
                      ? dayjs(achievement.issueDate).format('MMM, YYYY')
                      : issueDate !== undefined && issueDate !== null
                      ? dayjs(issueDate).format('MMM, YYYY')
                      : 'Both are invalid'}
                  </ListItemText>
                  <ListItemText
                    sx={{
                      fontWeight: '400',
                      marginRight: '50px',
                      color: '#666666',
                      display: 'inline-block',
                    }}
                  >
                    {certificateMessage}
                  </ListItemText>
                </Box>
              </>
            ) : null
          ) : null}
        </ListItem>
        {viewState === AchievementsTabState.EDIT_STATE ? (
          isChecked ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  marginX={2}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    position: 'relative',
                    my: 2.5,
                    paddingLeft: 9,
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 400, paddingRight: 3 }}>Completed</Typography>
                  <DatePicker
                    slotProps={{
                      ...(!achievement.hasError
                        ? {
                            textField: {
                              size: 'medium',
                              error: false,
                            },
                          }
                        : null),
                    }}
                    disableFuture
                    label={'MON, YYYY'}
                    views={['year', 'month']}
                    sx={{ width: 200, marginRight: 7 }}
                    value={achievementIssueDateExists ? dayjs(achievement.issueDate) : dayjs(issueDate)}
                    onChange={(newValue) => {
                      setIssueDate(dayjs(newValue).format('YYYY-MM-DD'));
                      wasChange = true;
                      if (achievement.hasError) {
                        achievement.hasError = false;
                      }
                    }}
                  />
                  <Checkbox
                    checked={endDateExists}
                    onChange={(e) => {
                      endDateExists ? setExpiringDate(null) : {};
                      setEndDateExists(e.target.checked);
                      wasChange = true;
                    }}
                    sx={{ paddingRight: 1 }}
                  />
                  <Typography sx={{ fontSize: 14, fontWeight: 400, paddingRight: 3 }}>Certificate issued</Typography>
                  {endDateExists && (
                    <Box sx={{ my: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          slotProps={{
                            ...(achievement.hasError && issueDateExists
                              ? null
                              : {
                                  textField: {
                                    size: 'medium',
                                    error: false,
                                  },
                                }),
                          }}
                          sx={{ width: 200 }}
                          label={'MON, YYYY'}
                          views={['year', 'month']}
                          minDate={dayjs(issueDate).add(1, 'year')}
                          value={endDateExists ? dayjs(expiringDate) : dayjs(issueDate)}
                          onChange={(newValue) => {
                            setExpiringDate(dayjs(newValue).format('YYYY-MM-DD'));
                            wasChange = true;
                            setEndDateExists(true);
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  )}
                </Box>
              </LocalizationProvider>
            </>
          ) : null
        ) : null}
      </Box>
    </>
  );
};

export default AchievementListItem;
