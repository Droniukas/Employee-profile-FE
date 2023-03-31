import { Avatar, Box } from '@mui/material'
import React from 'react'
import Employee from '../../../models/Employee.interface';

type Props = {
  results: Employee;
};

const ProfileInfo: React.FC<Props> = ({results}) => {
    if (!results) return null;

    return (
        <>
            <Box sx={{
                position: 'relative',
                padding: '150px',
                marginLeft: 20,
                paddingRight: 100,
            }}>
                <Avatar src={`data:${results?.imageType};base64,${results?.imageBytes}`}
                        sx={{
                            position: 'absolute',
                            width: 120,
                            height: 120,
                            left: '5vw',
                            top: 200,
                        }}/>
                <h1 className='name'>
                    {results.name} {results.middleName} {results.surname}
                </h1>
                <h4 className='position'>
                    {results.title}
                </h4>
            </Box>
        </>
    )
}

export default ProfileInfo