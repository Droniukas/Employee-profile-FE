import { Avatar, Box, checkboxClasses, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { WidthFull } from '@mui/icons-material';
import './Header.scss';
import user from '../../data/user/user.json';
import { EmployeeService } from '../../services/employee.service';
import EmployeeResult from '../../models/EmployeeResult.interface';


const Header = () => {
    const [results, setResults] = useState<EmployeeResult>();
    const employeeService = new EmployeeService();

    const getResults = async (searchValue: string) => {
        const result = await employeeService.searchById(searchValue);
        setResults(result);
    };
    useEffect(() => {
        getResults('6979d331-027e-4a6b-8f64-1ee9bfe0ab71');
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
                alt="Cindy Baker" 
                src={`data:${results?.imageType};base64,${results?.imageBytes}`}
                // src={results.image} 
                sx={{ width: 65, height: 65, display:'inline-block'}}/>
            </div>
        </Box>
    </>
  )
}

export default Header;