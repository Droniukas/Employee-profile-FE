import { Box, Checkbox, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Achievement } from '../../../models/Achievement.interface';
import { updateChangedAchievement } from '../../../states/changedAchievements';
import { OnCancelRoot, ViewStateRoot } from '../../../store/achievementTypes';
import { AchievementsTabState } from '../../enums/AchievementsTabState';
import AchievementListItemErrorText from './AchievementListItemErrorText';
import { StyledSwitch } from './StyledSwitch';

type AchievementListItemProps = {
  achievement: Achievement;
  showEndDate: boolean;
};

let wasChange = false;

const AchievementListItem: React.FunctionComponent<AchievementListItemProps> = (props: AchievementListItemProps) => {
  const { achievement, showEndDate } = props;
  const viewState = useSelector((state: ViewStateRoot) => state.viewAchievementsState.value);
  const [issueDate, setIssueDate] = useState<string | null>();
  const [expiringDate, setExpiringDate] = useState<string | null>();
  const [isChecked, setChecked] = useState<boolean>(false);

  const expiringDateExists: boolean = expiringDate !== undefined && expiringDate !== null;
  const achievementIssueDateExists: boolean = achievement.issueDate !== null && achievement.issueDate !== undefined;
  const achievementExpiringDateExists: boolean =
    achievement.expiringDate !== null && achievement.expiringDate !== undefined;

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

  // const changedAchievements = useSelector((state: ChangedAchievementsDataRoot) => state.changedAchievements.value);
  const dispatch = useDispatch();
  // const currentChangedAchievement = changedAchievements.filter((item) => item.achievementId !== achievement.achievementId);

  const onSwitchChange = () => {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          updateChangedAchievement(
            // ...changedAchievements,
            {
              achievementId: achievement.achievementId,
              achievementName: achievement.achievementName,
              checked: true,
              issueDate: issueDate,
              expiringDate: expiringDate,
              employeeId: process.env.REACT_APP_TEMP_USER_ID,
            },
          ),
        )
      : dispatch(
          updateChangedAchievement({
            // ...currentChangedAchievement,
            achievementId: achievement.achievementId,
            achievementName: achievement.achievementName,
            checked: false,
            issueDate: null,
            expiringDate: null,
            employeeId: process.env.REACT_APP_TEMP_USER_ID,
          }),
        );
  };
  const onDatePickerChange = () => {
    dispatch(
      updateChangedAchievement({
        // ...currentChangedAchievement,
        achievementId: achievement.achievementId,
        achievementName: achievement.achievementName,
        checked: true,
        issueDate: issueDate,
        expiringDate: expiringDate,
        employeeId: process.env.REACT_APP_TEMP_USER_ID,
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
            {achievement.hasError ? <AchievementListItemErrorText /> : null}
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
                      : 'abu netiko'}
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
                    my: 1,
                    paddingLeft: 9,
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 400, paddingRight: 3 }}>Completed</Typography>
                  <DatePicker
                    slotProps={{
                      ...(!achievement.hasError
                        ? {
                            textField: {
                              size: 'small',
                              error: false,
                            },
                          }
                        : null),
                    }}
                    label={'MON, YYYY'}
                    views={['month', 'year']}
                    sx={{ width: 200, marginRight: 7 }}
                    value={achievementIssueDateExists ? dayjs(achievement.issueDate) : dayjs(issueDate)}
                    onChange={(newValue) => {
                      setIssueDate(dayjs(newValue).format('YYYY-MM-DD'));
                      wasChange = true;
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
                            ...(!achievement.hasError
                              ? {
                                  textField: {
                                    size: 'small',
                                    error: false,
                                  },
                                }
                              : null),
                          }}
                          sx={{ width: 200 }}
                          label={'MON, YYYY'}
                          views={['month', 'year']}
                          minDate={dayjs(issueDate)}
                          maxDate={dayjs(issueDate).add(1, 'year')}
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
