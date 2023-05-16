import './Header.scss';

import { useAuth0 } from '@auth0/auth0-react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Badge, BadgeProps, Box, IconButton, Link, Menu, MenuItem, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { deleteAuthToken } from '../../config/auth';
import { ROUTES } from '../../routes/routes';
import { UserStateRoot } from '../../store/types/user';
import Loading from '../loading/Loading';
import NotificationsDropdown from './Notifications/NotificationsDropdown';
import { NotificationService } from '../../services/notifications.service';
import { Notification } from '../../models/Notification.interface';

const Header = () => {
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [userIconAnchorEl, setUserIconAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationIconAnchorEl, setNotificationIconAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(userIconAnchorEl);
  const { logout } = useAuth0();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[] | null>();

  const handleUserIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserIconAnchorEl(event.currentTarget);
  };
  const handleMyProfileSelection = () => {
    setUserIconAnchorEl(null);
  };

  const handleLogout = () => {
    deleteAuthToken();
    logout({ logoutParams: { returnTo: `${process.env.REACT_APP_BASE_URL}${ROUTES.LOGOUT}` } });
  };

  const notificationService = new NotificationService();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const notifications = await notificationService.getAllNotificationsByEmployeeId(user.id);
        console.log(notifications);
        setNotifications(notifications);
        setNotificationCount(notifications.length);
      }
    };
    fetchNotifications();
  }, [user]);

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      right: 3,
      top: 10,
      height: '22px',
      width: '22px',
      border: '2px solid white',
      padding: '4px',
      borderRadius: '100%',
    },
  }));

  const handleNotificationIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationIconAnchorEl(event.currentTarget);
  };

  const handleNotificationsDropdownClose = () => {
    setNotificationIconAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 4,
        backgroundColor: '#FFFFFF',
        borderBottom: 2,
        borderColor: 'divider',
        height: 64,
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <IconButton
        onClick={(event) => {
          handleNotificationIconClick(event);
        }}
      >
        <StyledBadge badgeContent={<b>{notificationCount}</b>} color="secondary">
          <NotificationsIcon sx={{ width: 35, height: 35, color: 'black' }} />
        </StyledBadge>
      </IconButton>
      {user ? (
        <Avatar
          src={`data:${user?.imageType};base64,${user?.imageBytes}`}
          sx={{ width: 40, height: 40, display: 'inline-block', cursor: 'pointer', marginRight: 10 }}
          onClick={(event) => {
            handleUserIconClick(event);
          }}
        />
      ) : (
        <Loading size={40} style={{ marginTop: 1, display: 'inline-block' }} />
      )}
      <Menu
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={userIconAnchorEl}
        open={open}
        onClose={() => {
          setUserIconAnchorEl(null);
        }}
      >
        <Link href={`${process.env.REACT_APP_BASE_URL}${ROUTES.SKILLS}`} underline="none">
          <MenuItem sx={{ color: 'primary.main', fontWeight: 'bold' }} onClick={handleMyProfileSelection}>
            My Profile
          </MenuItem>
        </Link>
        <Link underline="none">
          <MenuItem sx={{ color: 'primary.main', fontWeight: 'bold' }} onClick={handleLogout}>
            Log out
          </MenuItem>
        </Link>
      </Menu>
      {notifications && (
        <NotificationsDropdown
          onClose={handleNotificationsDropdownClose}
          notificationIconAnchorEl={notificationIconAnchorEl}
          notifications={notifications}
        />
      )}
    </Box>
  );
};

export default Header;
