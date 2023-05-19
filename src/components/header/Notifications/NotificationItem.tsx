import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Avatar, Box, IconButton, Theme, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from 'react-redux';

import { Notification } from '../../../models/Notification.interface';
import { NotificationService } from '../../../services/notifications.service';
import { setIsReadById } from '../../../states/notifications';
import NotificationTextElement from './NotificationTextElement';
import MyProjectEditView from '../../myProjects/MyProjectEditView';
import { ProjectsService } from '../../../services/projects.service';
import { useEffect, useState } from 'react';
import { UserStateRoot } from '../../../store/types/user';
import MyProject from '../../../models/MyProject.interface';

type NotificationItemProps = {
  currentNotification: Notification;
};

const NotificationItem = (props: NotificationItemProps) => {
  const { currentNotification } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [myProject, setMyProject] = useState();
  const [openPopup, setOpenPopup] = useState(false);

  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const elapsedTimeFromCreation = dayjs(currentNotification.notificationCreatedAt).from(dayjs(), true);

  const notificationService = new NotificationService();

  const setNotificationIsReadById = (id: number) => {
    notificationService.setIsReadById(id, true);
    dispatch(setIsReadById(id));
  };

  const handleMarkAsReadClick = () => {
    setNotificationIsReadById(currentNotification.id);
  };

  const handleNotificationClick = () => {
    setNotificationIsReadById(currentNotification.id);
    setOpenPopup(true);
  };

  const projectService = new ProjectsService();

  useEffect(() => {
    if (user) {
      setUserMyProject();
    }
  }, []);

  const setUserMyProject = async () => {
    const allUserProjects = await projectService.getMyProjects(user.id);
    const currentUserProject = allUserProjects.find(
      (userMyProject: MyProject) => userMyProject.id === currentNotification.project.id,
    );
    setMyProject(currentUserProject);
  };

  return (
    <Box
      sx={{
        padding: '15px',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        ...(!currentNotification.read && {
          backgroundColor: '#d8f8f7',
        }),
        transition: (theme: Theme) => theme.transitions.create(['background-color']),
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Box onClick={handleNotificationClick} sx={{ cursor: 'pointer' }}>
          <Avatar
            src={`data:${currentNotification.initiatorEmployee.imageType};base64,${currentNotification.initiatorEmployee.imageBytes}`}
            sx={{
              border: '0.01px solid lightgrey',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ cursor: 'pointer', fontSize: 12, mr: 2 }} onClick={handleNotificationClick}>
            <NotificationTextElement currentNotification={currentNotification} />
          </Box>
          <Box fontSize="10px" color="grey">
            {elapsedTimeFromCreation} ago
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: 'auto' }}>
        {!currentNotification.read && (
          <Tooltip title="Mark as read" placement="bottom-end">
            <IconButton sx={{ color: 'primary.main', bottom: 1 }} onClick={handleMarkAsReadClick}>
              <CircleRoundedIcon style={{ fontSize: 10 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {openPopup && myProject && (
        <MyProjectEditView
          onClose={() => {
            setOpenPopup(false);
          }}
          myProject={myProject}
          forceViewMode={true}
        />
      )}
    </Box>
  );
};

export default NotificationItem;
