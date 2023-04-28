import './Header.scss';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Link, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import { ROUTES } from '../routes/routes';

const Header = () => {
  const [result, setResult] = useState<Employee>();
  const employeeService = new EmployeeService();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMyProfileSelection = () => {
    setAnchorEl(null);
  };

  const getResult = async (id: string) => {
    const employee = await employeeService.getById(id);
    setResult(employee);
  };

  useEffect(() => {
    getResult(`${process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 4,
          backgroundColor: '#FFFFFF',
          borderBottom: 2,
          borderColor: 'divider',
          height: 100,
          width: '100%',
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'right',
        }}
      >
        <div className="top-header">
          <NotificationsIcon sx={{ width: 40, height: 40, marginRight: 4, marginBottom: 1.1 }} />
          <Avatar
            src={`data:${result?.imageType};base64,${result?.imageBytes}`}
            sx={{ width: 65, height: 65, marginTop: 1, display: 'inline-block', cursor: 'pointer' }}
            onClick={(event) => {
              handleClick(event);
            }}
          />
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
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Header;
