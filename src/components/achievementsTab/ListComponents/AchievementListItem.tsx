import { Box, Checkbox, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChangedAchievements } from '../../../states/changedAchievements';
import { ChangedAchievementsDataRoot, OnCancelRoot, ViewStateRoot } from '../../../store/achievementTypes';
import { AchievementsTabState } from '../../enums/AchievementsTabState';
import { Achievement } from '../../../models/Achievement.interface';
import AchievementListItemErrorText from './AchievementListItemErrorText';
import { StyledSwitch } from './StyledSwitch';

type AchievementListItemProps = {
  achievementObject: Achievement;
  showEndDate: boolean;
};

let wasChange = false;

const AchievementListItem: React.FunctionComponent<AchievementListItemProps> = (props: AchievementListItemProps) => {
  const { achievementObject, showEndDate } = props;
  const viewState = useSelector((state: ViewStateRoot) => state.viewAchievementsState.value);
  const [issueDate, setIssueDate] = useState<string | null>();
  const [expiringDate, setExpiringDate] = useState<string | null>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const expiringDateExists: boolean = expiringDate !== undefined && expiringDate !== null;
  const objectIssueDateExists: boolean =
    achievementObject.issueDate !== null && achievementObject.issueDate !== undefined;
  const objectExpiringDateExists: boolean =
    achievementObject.expiringDate !== null && achievementObject.expiringDate !== undefined;

  useEffect(() => {
    setChecked(achievementObject.checked);
    achievementObject.issueDate !== undefined ? setIssueDate(achievementObject.issueDate) : null;
    achievementObject.expiringDate !== undefined ? setExpiringDate(achievementObject.expiringDate) : null;
  }, [achievementObject.checked, achievementObject.issueDate, achievementObject.expiringDate]);

  const [endDateExists, setEndDateExists] = useState<boolean>(expiringDateExists || objectIssueDateExists);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(achievementObject.checked);
    achievementObject.issueDate !== undefined ? setIssueDate(achievementObject.issueDate) : issueDate;
    achievementObject.expiringDate !== undefined ? setExpiringDate(achievementObject.expiringDate) : expiringDate;
  }, [onCancel]);

  const changedAchievements = useSelector((state: ChangedAchievementsDataRoot) => state.changedAchievements.value);
  const dispatch = useDispatch();
  const currentChangedAchievement = changedAchievements.filter((item) => item.id !== achievementObject.id);

  const onSwitchChange = () => {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          setChangedAchievements([
            ...changedAchievements,
            {
              id: achievementObject.id,
              achievement: achievementObject.achievementName,
              checked: true,
              issueDate: issueDate,
              expiringDate: expiringDate,
            },
          ]),
        )
      : dispatch(
          setChangedAchievements([
            ...currentChangedAchievement,
            {
              id: achievementObject.id,
              achievement: achievementObject.achievementName,
              checked: false,
              issueDate: null,
              expiringDate: null,
            },
          ]),
        );
  };
  const onDatePickerChange = () => {
    dispatch(
      setChangedAchievements([
        ...currentChangedAchievement,
        {
          id: achievementObject.id,
          achievement: achievementObject.achievementName,
          checked: true,
          issueDate: issueDate,
          expiringDate: expiringDate,
        },
      ]),
    );
  };

  if (wasChange) {
    onDatePickerChange();
    wasChange = false;
  }

  const certificateMessage =
    endDateExists && objectExpiringDateExists
      ? 'Certificate:  ' + dayjs(achievementObject.expiringDate).format('MMM YYYY')
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
            {achievementObject.achievementName}
            {achievementObject.hasError ? <AchievementListItemErrorText /> : null}
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
                    {achievementObject.issueDate !== undefined && achievementObject.issueDate !== null
                      ? dayjs(achievementObject.issueDate).format('MMM, YYYY')
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
                    label={'MON, YYYY'}
                    views={['month', 'year']}
                    sx={{ width: 200, marginRight: 7 }}
                    value={objectIssueDateExists ? dayjs(achievementObject.issueDate) : dayjs(issueDate)}
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
