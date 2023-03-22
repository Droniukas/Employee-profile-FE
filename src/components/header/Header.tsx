import { Avatar, Box, checkboxClasses, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import App from '../../App'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { WidthFull } from '@mui/icons-material';

const Header = () => {
  return (
    <>
            {/* Header */}
            {/* Left header: */}
        <Box sx={{ position: 'fixed', backgroundColor:'#FFFFFF', zIndex: 5, borderRight: 1, borderColor: 'divider', width: 100, height: '100%', display:'flex', justifyContent:'normal', alignItems:''}}>
            {/* Cognizant logo */}
            <img src='https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png' alt='' style={{
                position: 'relative',
                width:'100%',
                height: 100
            }}></img>

            {/* My profile */}
            <div style={{position:'absolute', display:'block', marginTop: 130, marginLeft: '10%', justifyContent:'center', alignItems:'center'}}>
                <div style={{position: 'absolute', 
                            backgroundColor: 'grey', 
                            marginLeft: 4, 
                            marginTop: 5,
                            width: 70, 
                            height: 70, 
                            borderRadius: 24, 
                            background: 'linear-gradient(90deg, rgba(61, 84, 206, 0.12) 0.02%, rgba(53, 202, 207, 0.12) 100.04%), rgba(255, 255, 255, 0.1)'}}></div>
                <PersonIcon sx={{width:50, 
                                height: 50, 
                                marginLeft: 1.9, 
                                marginTop: 1.9, 
                                color: 'linear-gradient(90deg, #3D54CE 0.02%, #35CACF 100.04%), #000048'}}/>
                <h4 style={{position:'relative', marginTop: 7, marginLeft: 1}}>My profile</h4>
            </div>

            {/* Search */}
            <div style={{position:'absolute', display:'block', marginTop: 280, marginLeft: 9, justifyContent:'center', alignItems:'center'}}>
                <SearchIcon sx={{width:40, height: 40, marginLeft: 2.9}}/>
                <h4 style={{position:'relative', marginTop: 1, marginLeft: 15}}>Search</h4>
            </div>
        </Box>

            {/* Top header: */}
        <Box sx={{ position: 'fixed', zIndex: 4, backgroundColor:'#FFFFFF', borderBottom: 2, borderColor: 'divider', height:100, width: '100%', display:'flex', justifyContent:'right', alignItems:'right'}}>

            <div style={{margin:'12px 96px 12px 0px'}}>
            <NotificationsIcon sx={{width: 40, height: 40, marginRight:4, marginBottom: 1.1}}/>
                <Avatar 
                alt="Cindy Baker" 
                src="https://pbs.twimg.com/media/EPGPKKfVUAABUAJ.jpg" 
                sx={{ width: 65, height: 65, display:'inline-block'}}/>
            </div>
        </Box>
        
        
    </>
  )
}

export default Header