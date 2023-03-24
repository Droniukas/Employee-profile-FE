import React from 'react';
import EmployeeResult from '../../../models/EmployeeResult.interface';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

type Props = {
    results: EmployeeResult[];
};

const FindEmployeeResults: React.FC<Props> = ({results}) => {
    if (!results.length) return null;
    let fullName;

    return (
        <List
            sx={{
                width: '140%',
                backgroundColor: 'white', borderRadius: '10px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0)',
            }}>
            {results
                .sort((a, b) => a.name > b.name ? 1 : -1)
                .map((result) => (
                    <>
                        <Box
                            sx={{
                                display: {
                                    xl: 'none',
                                    xs: 'none'
                                },
                                
                            }}>
                            {result.middle_name
                                ? fullName = `${result.name} ${result.middle_name} ${result.surname}`
                                : fullName = `${result.name} ${result.surname}`
                            }
                        </Box>
                        <ListItem alignItems='flex-start'>
                            <ListItemAvatar>
                                <Avatar
                                    src={result.image}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={fullName}
                                secondary={
                                    <React.Fragment>
                                        {result.title_id}
                                    </React.Fragment>
                                }
                                sx={{
                                    color: '#000048'
                                }}
                            />
                        </ListItem>
                        {/* <Divider
                            variant='fullWidth'
                            component='li'
                        /> */}
                    </>
                ))}
        </List>
    );
};

export default FindEmployeeResults;