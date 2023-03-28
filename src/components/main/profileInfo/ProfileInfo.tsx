import { Avatar, Box } from '@mui/material'
import React from 'react'
import user from '../../../data/user/user.json';

const ProfileInfo = () => {
  return (
    <>
        <Box sx={{position:'relative', padding:'150px', marginLeft: 20, paddingRight:100}}>
            <Avatar 
                alt="Cindy Baker" 
                src={user.image} 
                sx={{ position: 'absolute',
                    width: 120,
                    height: 120,
                    left: '5vw',
                    top: 200,
                    }}/>
            <h1 className='name'>{user.name} {user.middle_name} {user.surname}</h1>
            <h4 className='position'>{user.title_id}</h4>
        </Box>
    </>
  )
}

export default ProfileInfo