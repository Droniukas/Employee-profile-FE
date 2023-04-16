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
  const [achievementStartDate, setAchievementStartDate] = useState<string>();
  const [achievementEndDate, setAchievementEndDate] = useState<string>();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [endDateExists, setEndDateExists] = useState<boolean>(showEndDate);

  useEffect(() => {
    setChecked(achievementObj.checked);
    achievementObj.achievementStartDate !== null
      ? setAchievementStartDate(achievementObj.achievementStartDate)
      : setAchievementStartDate(dayjs().toISOString);
    achievementObj.achievementEndDate !== null ? setAchievementEndDate(achievementObj.achievementEndDate) : null;
  }, [achievementObj.checked, achievementObj.achievementStartDate, achievementObj.achievementEndDate]);

  const onCancel = useSelector((state: OnCancelRoot) => state.onCancel.value);
  useEffect(() => {
    setChecked(achievementObj.checked);
    achievementObj.achievementStartDate !== null
      ? setAchievementStartDate(achievementObj.achievementStartDate)
      : setAchievementStartDate(dayjs().toISOString);
    achievementObj.achievementEndDate !== null ? setAchievementEndDate(achievementObj.achievementEndDate) : null;
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
                <ListItemText sx={{ fontWeight: '200', paddingLeft: '300px', marginLeft: '0px', color: '#666666' }}>
                  {dayjs(achievementStartDate).format('MMM, YYYY')}
                  {/* {achievementObj.hasError ? <AchievementListItemErrorText /> : null} */}
                </ListItemText>
                <ListItemText sx={{ fontWeight: '400', paddingLeft: '0px', marginLeft: '0px', color: '#666666' }}>
                  Certificate: {dayjs(achievementEndDate).format('MMM YYYY')}
                </ListItemText>
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
                    value={dayjs(achievementStartDate)}
                    onChange={(newValue) => {
                      if (newValue === null) return;
                      setAchievementStartDate(dayjs(newValue).toISOString());
                      console.log('start date:' + achievementStartDate);
                    }}
                  />
                  <Checkbox
                    checked={endDateExists}
                    onChange={(e) => {
                      setEndDateExists(e.target.checked);
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
                          value={achievementEndDate ? dayjs(achievementEndDate) : null}
                          onChange={(newValue) => {
                            setAchievementEndDate(dayjs(newValue).toISOString());
                            console.log('end Date: ' + achievementEndDate);
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  )}
                </Box>
                {/* <AchievementLevelDropdownList
                  achievementLevel={achievementLevel}
                  setAchievementLevel={setAchievementLevel}
                  achievementObj={achievementObj}
                  tooltipText={tooltipText}
                /> */}
              </LocalizationProvider>
            </>
          ) : null
        ) : null}
      </Box>
    </>
  );
};

export default AchievementListItem;
