import './Header.scss';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box } from '@mui/material';
import { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';

const Header = () => {
  const [result, setResult] = useState<Employee>();
  const employeeService = new EmployeeService();

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
            sx={{ width: 65, height: 65, marginTop: 1, display: 'inline-block' }}
          />
        </div>
      </Box>
    </>
  );
};

export default Header;
