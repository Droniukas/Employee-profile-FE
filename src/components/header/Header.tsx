import { Avatar, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import './Header.scss';
import { EmployeeService } from '../../services/employee.service';
import Employee from '../../models/Employee.interface';


const Header = () => {
    const [results, setResults] = useState<Employee>();
    const employeeService = new EmployeeService();

    const getResults = async (id: string) => {
        const result = await employeeService.getById(id);
        setResults(result);
    };
    useEffect(() => {
        getResults(`${process.env.REACT_APP_TEMP_USER_ID}`);
    }, []);

  return (
    <>
            {/* Left header: */}
        <Box sx={{ position: 'fixed', backgroundColor:'#FFFFFF', zIndex: 5, borderRight: 1, borderColor: 'divider', width: 100, height: '100%', display:'flex', justifyContent:'normal', alignItems:''}}>
            <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' className='image'></img>
            <div className='profile'>
                <div className='roundBox'></div>
                <PersonIcon sx={{width:50,
                                height: 50,
                                marginLeft: 1.9,
                                marginTop: 1.9,
                                color: 'linear-gradient(90deg, #3D54CE 0.02%, #35CACF 100.04%), #000048'}}/>
                <h4 className='profileText'>My profile</h4>
            </div>
            <div className='search-div'>
                <SearchIcon sx={{width:40, height: 40, marginLeft: 2.9}}/>
                <h4 className='searchText'>Search</h4>
            </div>
        </Box>

            {/* Top header: */}
        <Box sx={{ position: 'fixed', zIndex: 4, backgroundColor:'#FFFFFF', borderBottom: 2, borderColor: 'divider', height:100, width: '100%', display:'flex', justifyContent:'right', alignItems:'right'}}>
            <div className='topHeader'>
            <NotificationsIcon sx={{width: 40, height: 40, marginRight:4, marginBottom: 1.1}}/>
                <Avatar
                src={`data:${results?.imageType};base64,${results?.imageBytes}`}
                sx={{ width: 65, height: 65, marginTop: 1, display:'inline-block'}}/>
            </div>
        </Box>
    </>
  )
}

export default Header;
