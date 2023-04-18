import { Box, Checkbox, FormControlLabel, ListItem, ListItemText, Typography } from '@mui/material';
// import mapAchievementLevelToTooltip from './utils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChangedAchievements } from '../../../state/changedAchievements';
import { ChangedAchievementsDataRoot, OnCancelRoot, ViewStateRoot } from '../../../store/achievementTypes';
import { AchievementsTabState } from '../models/enums/AchievementsTabState';
import { Achievement } from '../models/interfaces/Achievement.interface';
// import AchievementLevelDropdownList from './AchievementLevelDropdownList';
// import AchievementLevelWithTooltip from './AchievementLevelWithTooltip';
// import AchievementListItemErrorText from './AchievementListItemErrorText';
import { StyledSwitch } from './StyledSwitch';

type AchievementListItemProps = {
  achievementObj: Achievement;
  showEndDate: boolean;
};

const AchievementListItem: React.FunctionComponent<AchievementListItemProps> = (props: AchievementListItemProps) => {
  const { achievementObj, showEndDate } = props;
  const viewState = useSelector((state: ViewStateRoot) => state.viewAchievementsState.value);
  const [achievementStartDate, setAchievementStartDate] = useState<string | null>();
  const [achievementEndDate, setAchievementEndDate] = useState<string | null>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(achievementObj.checked);

  useEffect(() => {
    setChecked(achievementObj.checked);
    achievementObj.achievementStartDate !== undefined
      ? setAchievementStartDate(achievementObj.achievementStartDate)
      : null;
    achievementObj.achievementEndDate !== undefined ? setAchievementEndDate(achievementObj.achievementEndDate) : null;
    console.log('end objekto Date: ' + achievementObj.achievementEndDate);
    console.log('start objekto Date: ' + achievementObj.achievementStartDate);
  }, [achievementObj.checked, achievementObj.achievementStartDate, achievementObj.achievementEndDate]);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(achievementObj.checked);
    achievementObj.achievementStartDate !== undefined
      ? setAchievementStartDate(achievementObj.achievementStartDate)
      : achievementStartDate;
    achievementObj.achievementEndDate !== undefined
      ? setAchievementEndDate(achievementObj.achievementEndDate)
      : achievementEndDate;
  }, [onCancel]);

  const changedAchievements = useSelector((state: ChangedAchievementsDataRoot) => state.changedAchievements.value);
  const dispatch = useDispatch();

  const onSwitchChange = () => {
    setChecked(!isChecked);
    !isChecked
      ? dispatch(
          setChangedAchievements([
            ...changedAchievements,
            {
              id: achievementObj.id,
              achievement: achievementObj.achievementName,
              checked: true,
              achievementStartDate: achievementStartDate,
              achievementEndDate: achievementEndDate,
            },
          ]),
        )
      : dispatch(
          setChangedAchievements([
            ...changedAchievements.filter((item) => item.id !== achievementObj.id),
            {
              id: achievementObj.id,
              achievement: achievementObj.achievementName,
              checked: false,
              achievementStartDate: null,
              achievementEndDate: null,
            },
          ]),
        );
  };
  const onDatePickerChange = () => {
    dispatch(
      setChangedAchievements([
        ...changedAchievements.filter((item) => item.id !== achievementObj.id),
        {
          id: achievementObj.id,
          achievement: achievementObj.achievementName,
          checked: true,
          achievementStartDate: achievementStartDate,
          achievementEndDate: achievementEndDate,
        },
      ]),
    );
  };

  // const tooltipText: string = mapAchievementLevelToTooltip(achievementLevel);

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
                  onChange={onSwitchChange}
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
            {achievementObj.achievementName}
            {/* {achievementObj.hasError ? <AchievementListItemErrorText /> : null} */}
          </ListItemText>

          {viewState === AchievementsTabState.VIEW_STATE ? (
            isChecked ? (
              <>
                {/* <AchievementLevelWithTooltip name={achievementLevel} tooltipText={tooltipText} /> */}
                <Box sx={{ marginRight: '0px', width: '400px', display: 'inline-block' }}>
                  <ListItemText
                    sx={{
                      fontWeight: '200',
                      color: '#666666',
                      display: 'inline-block',
                      marginRight: '50px',
                    }}
                  >
                    {dayjs(achievementStartDate).format('MMM, YYYY')}
                    {/* {achievementObj.hasError ? <AchievementListItemErrorText /> : null} */}
                  </ListItemText>
                  {endDateExists && achievementEndDate !== null && achievementEndDate !== undefined && (
                    <ListItemText
                      sx={{
                        fontWeight: '400',
                        marginRight: '50px',
                        color: '#666666',
                        display: 'inline-block',
                      }}
                    >
                      Certificate: {dayjs(achievementEndDate).format('MMM YYYY')}
                    </ListItemText>
                  )}
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
                    // disableFuture
                    // maxDate={dayjs().format('YYYY-MM-DD')}
                    // value={achievementStartDate !== undefined ? achievementStartDate : null}
                    value={dayjs(achievementStartDate)}
                    onChange={(newValue) => {
                      console.log('start date', achievementStartDate);
                      setAchievementStartDate(dayjs(newValue).format('YYYY-MM-DD'));
                      // console.log('start date:' + achievementStartDate);
                      // achievementObj.achievementStartDate = achievementStartDate;
                      // console.log('end Date: ' + achievementObj.achievementEndDate);
                      onDatePickerChange();
                      console.log(achievementStartDate, 'achievementStartDate');
                      console.log(newValue, 'newValue');
                    }}
                  />
                  <Checkbox
                    checked={endDateExists}
                    onChange={(e) => {
                      setEndDateExists(e.target.checked);
                      e.preventDefault();
                      // setFieldValue('endDate', '');
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
                          // minDate={dayjs(achievementObj.achievementStartDate)}
                          // value={endDateExists ? dayjs(achievementEndDate) : null}
                          // disablePast
                          value={endDateExists ? dayjs(achievementEndDate) : dayjs(achievementStartDate)}
                          onChange={(newValue) => {
                            setAchievementEndDate(dayjs(newValue).format('YYYY-MM-DD'));
                            // console.log('end Date:        ' + achievementEndDate);
                            // achievementObj.achievementEndDate = achievementEndDate;
                            // console.log('object end Date: ' + achievementObj.achievementEndDate);
                            onDatePickerChange();
                            console.log(achievementEndDate);
                            const dayJSFormated = dayjs(newValue).format('YYYY-MM-DD');
                            console.log(dayJSFormated, 'dayJsFormated');
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
