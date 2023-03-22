import { Avatar, Box } from '@mui/material'
import React from 'react'
import App from '../../App'
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  return (
    <>
        <Box sx={{ position: 'fixed', backgroundColor:'white', borderBottom: 1, borderColor: 'divider', width: '100%', display:'flex', justifyContent:'right', alignItems:'right'}}>

            <div style={{margin:'12px 96px 12px 0px'}}>
            <NotificationsIcon sx={{position: '-webkit-sticky', marginRight:4, marginBottom: 0.5}}/>
                <Avatar 
                alt="Cindy Baker" 
                src="https://pbs.twimg.com/media/EPGPKKfVUAABUAJ.jpg" 
                sx={{ width: 40, height: 40, display:'inline-block'}}/>
            </div>
        </Box>
        
        <Box sx={{padding:'100px'}}>
            <Avatar 
                alt="Cindy Baker" 
                src="https://pbs.twimg.com/media/EPGPKKfVUAABUAJ.jpg" 
                sx={{ position: 'absolute',
                    width: 64,
                    height: 64,
                    left: 168,
                    top: 144,
                     }}/>
            <h1 style={{position:'absolute',
                        height: 40,
                        left: 168,
                        top: 224
                        }}>Linus tech</h1>

            <h4 style={{position:'absolute',
                        height: 20,
                        left: 168,
                        top: 268
                        }}>Software Engineer at Supernova</h4>
        </Box>

    </>
  )
}

export default Header