import './Header.scss';

import { useAuth0 } from '@auth0/auth0-react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Link, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { deleteAuthToken } from '../../config/auth';
import { ROUTES } from '../../routes/routes';
import { UserStateRoot } from '../../store/types/user';
import Loading from '../loading/Loading';

const Header = () => {
  const result = useSelector((state: UserStateRoot) => state.userState.value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMyProfileSelection = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteAuthToken();
    logout({ logoutParams: { returnTo: `${process.env.REACT_APP_BASE_URL}${ROUTES.LOGOUT}` } });
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
      }}
    >
      <div className="top-header">
        <NotificationsIcon sx={{ width: 20, height: 20, marginRight: 4 }} />
        {result ? (
          <Avatar
            src={`data:${result?.imageType};base64,${result?.imageBytes}`}
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
            onClick={(event) => {
              handleClick(event);
            }}
          />
        ) : (
          <Loading size={40} style={{ display: 'inline-block' }} />
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
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
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
      </div>
    </Box>
  );
};

export default Header;
