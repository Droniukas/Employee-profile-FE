import React from 'react';
import './ProjectProfiles.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';
import {display} from '@mui/system';

const ProjectProfiles = () => {
    return (
        <div className='project-profiles-container'>
            <Box display='flex'
                 justifyContent='flex-end'
                 sx={{
                     position: 'absolute',
                     my: 0.25,
                     width: 1344,
                     left: 250
                 }}
            >
                <Button
                    type='submit'
                    variant='contained'
                    id='addNewProject'
                    sx={{
                        my: 1,
                    }}
                >
                    Add new project
                </Button>
            </Box>
            <Box sx={{
                position: 'absolute',
                my: 2,
                width: 1344,
                top: 680,
                left: 250,
                backgroundColor: 'yellow'
            }}
            >
                <List
                    sx={{
                        width: '100%'
                    }}
                >
                    <ListItem alignItems='flex-start'
                              sx={{
                                  border: 1,
                                  borderColor: '#DDDDDD',
                                  borderRadius: 2,
                                  backgroundColor: 'white',
                                  mb: 1
                              }}
                    >
                        <Grid container
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={0.5}
                        >
                            <Grid item
                                  xs={1}
                            >
                                <Box alignItems='center'
                                     display='flex'
                                     sx={{
                                         border: 1,
                                         borderColor: '#DDDDDD',
                                         borderRadius: '50%',
                                         width: 56,
                                         height: 56,
                                         justifyContent: 'center'
                                     }}
                                >
                                    <FolderIcon sx={{
                                        color: '#000048',
                                        fontSize: 26
                                    }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item
                                  xs={5}
                            >
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pt: 2
                                }}
                                >
                                    Start date - End date
                                </Typography>
                                <Typography sx={{
                                    color: '#000048',
                                    fontSize: 20
                                }}
                                >
                                    Project title
                                </Typography>
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical'
                                }}
                                >
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description
                                </Typography>
                            </Grid>
                            <Grid item
                                  xs={6}
                            >
                                <Box alignItems='flex-start'
                                     display='flex'>
                                    <AvatarGroup>
                                        <Avatar src='/static/images/avatar/1.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/2.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/3.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                    </AvatarGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>

                    <ListItem alignItems='flex-start'
                              sx={{
                                  border: 1,
                                  borderColor: '#DDDDDD',
                                  borderRadius: 2,
                                  backgroundColor: 'white',
                                  mb: 1
                              }}
                    >
                        <Grid container
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={0.5}
                        >
                            <Grid item
                                  xs={1}
                            >
                                <Box alignItems='center'
                                     display='flex'
                                     sx={{
                                         border: 1,
                                         borderColor: '#DDDDDD',
                                         borderRadius: '50%',
                                         width: 56,
                                         height: 56,
                                         justifyContent: 'center'
                                     }}
                                >
                                    <FolderIcon sx={{
                                        color: '#000048',
                                        fontSize: 26
                                    }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item
                                  xs={5}
                            >
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pt: 2
                                }}
                                >
                                    Start date - End date
                                </Typography>
                                <Typography sx={{
                                    color: '#000048',
                                    fontSize: 20
                                }}
                                >
                                    Project title
                                </Typography>
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical'
                                }}
                                >
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description
                                </Typography>
                            </Grid>
                            <Grid item
                                  xs={6}
                            >
                                <Box alignItems='flex-start'
                                     display='flex'>
                                    <AvatarGroup>
                                        <Avatar src='/static/images/avatar/1.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/2.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/3.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                    </AvatarGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>

                    <ListItem alignItems='flex-start'
                              sx={{
                                  border: 1,
                                  borderColor: '#DDDDDD',
                                  borderRadius: 2,
                                  backgroundColor: 'white',
                                  mb: 1
                              }}
                    >
                        <Grid container
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={0.5}
                        >
                            <Grid item
                                  xs={1}
                            >
                                <Box alignItems='center'
                                     display='flex'
                                     sx={{
                                         border: 1,
                                         borderColor: '#DDDDDD',
                                         borderRadius: '50%',
                                         width: 56,
                                         height: 56,
                                         justifyContent: 'center'
                                     }}
                                >
                                    <FolderIcon sx={{
                                        color: '#000048',
                                        fontSize: 26
                                    }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item
                                  xs={5}
                            >
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pt: 2
                                }}
                                >
                                    Start date - End date
                                </Typography>
                                <Typography sx={{
                                    color: '#000048',
                                    fontSize: 20
                                }}
                                >
                                    Project title
                                </Typography>
                                <Typography sx={{
                                    color: '#666666',
                                    fontSize: 14,
                                    pb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
                                    WebkitBoxOrient: 'vertical'
                                }}
                                >
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description Description Description Description
                                    Description Description Description Description
                                </Typography>
                            </Grid>
                            <Grid item
                                  xs={6}
                            >
                                <Box alignItems='flex-start'
                                     display='flex'>
                                    <AvatarGroup>
                                        <Avatar src='/static/images/avatar/1.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/2.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                        <Avatar src='/static/images/avatar/3.jpg'
                                                sx={{
                                                    width: 24,
                                                    height: 24
                                                }}
                                        />
                                    </AvatarGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Box>
        </div>
    );
};

export default ProjectProfiles;