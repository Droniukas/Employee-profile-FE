import React from 'react';
import ProjectsResult from '../../../models/ProjectProfilesResult.interface';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    results: ProjectsResult[];
};

const ProjectProfilesResult: React.FC<Props> = ({results}) => {
    function renderResultItem(result: ProjectsResult) {
        return (
            <>
                <ListItem alignItems='flex-start'
                          sx={{
                              border: 1,
                              borderColor: '#DDDDDD',
                              borderRadius: 2,
                              backgroundColor: 'white',
                              mb: 1,
                          }}>
                    <Grid container
                          direction='row'
                          justifyContent='flex-start'
                          alignItems='center'
                          spacing={0.5}>
                        <Grid item
                              xs={1}>
                            <Box display='flex'
                                 sx={{
                                     border: 1,
                                     borderColor: '#DDDDDD',
                                     borderRadius: '50%',
                                     width: 56,
                                     height: 56,
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                 }}>
                                <FolderIcon sx={{
                                    color: '#000048',
                                    fontSize: 26,
                                }}/>
                            </Box>
                        </Grid>
                        <Grid item
                              xs={5}>
                            <Typography sx={{
                                color: '#666666',
                                fontSize: 14,
                                pt: 1,
                            }}>
                                {result.startDate} - {result.endDate}
                            </Typography>
                            <Typography sx={{
                                color: '#000048',
                                fontSize: 20,
                            }}>
                                {result.title}
                            </Typography>
                            <Typography sx={{
                                color: '#666666',
                                fontSize: 14,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical',
                            }}>
                                {result.description}
                            </Typography>
                        </Grid>
                        <Grid item
                              xs={6}>
                            <Box alignItems='flex-start'
                                 display='flex'>
                                {renderEmployeesAvatarGroup(result.id)}
                                {setStatus(result.status)}
                                <IconButton aria-label='edit'
                                            sx={{
                                                color: '#000048',
                                                position: 'relative',
                                                left: 270,
                                                top: -13,
                                                backgroundColor: '#F4F4F4',
                                            }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label='delete'
                                            sx={{
                                                color: '#000048',
                                                position: 'relative',
                                                left: 280,
                                                top: -13,
                                                backgroundColor: '#F4F4F4',
                                            }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </ListItem>
            </>
        );
    }

    function renderEmployeesAvatarGroup(projectId: string) {//need to finish this
        return (
            <>
                <AvatarGroup>
                    <Avatar src='{`data:${result.imageType};base64,${result.imageBytes}`}'
                            sx={{
                                width: 24,
                                height: 24,
                            }}/>
                    <Avatar src='{`data:${result.imageType};base64,${result.imageBytes}`}'
                            sx={{
                                width: 24,
                                height: 24,
                            }}/>
                    <Avatar src='{`data:${result.imageType};base64,${result.imageBytes}`}'
                            sx={{
                                width: 24,
                                height: 24,
                            }}/>
                </AvatarGroup>
                <Typography sx={{
                    color: '#666666',
                    fontSize: 14,
                    pt: 2,
                    position: 'relative',
                    left: 10,
                    top: -13,
                }}>
                    +XX employees
                </Typography>
            </>
        );
    }

    function setStatus(projectStatus: string) {
        let statusColor;
        let fontColor;

        switch (projectStatus) {
            case 'Ongoing':
                statusColor = 'rgba(59, 248, 100, 0.24)';
                fontColor = 'rgba(26, 175, 85, 1)';
                break;
            case 'Delayed':
                statusColor = 'rgba(102, 102, 102, 1)';//need red color
                fontColor = 'black';
                break;
            case 'Finished':
                statusColor = 'rgba(102, 102, 102, 1)';//need blue color
                fontColor = 'black';
                break;
            default:
                statusColor = 'rgba(102, 102, 102, 1)';
                fontColor = 'black';
                break;
        }

        return (
            <>
                <Button sx={{
                    position: 'relative',
                    left: 65,
                    top: -7,
                    background: {statusColor},
                    color: {fontColor},
                    borderRadius: 1,
                }}>
                    {projectStatus}
                </Button>
            </>
        );
    }

    if (!results.length) {
        return (
            <List sx={{
                width: '100%',
            }}>
                <ListItem alignItems='flex-start'>
                    <Typography sx={{
                        color: '#000048',
                        fontSize: 20,
                    }}>
                        No projects added.
                    </Typography>
                </ListItem>
            </List>
        );
    } else {
        return (
            <List sx={{
                width: '100%',
            }}>
                {results.map((result) => (renderResultItem(result)))}
            </List>
        );
    }
};

export default ProjectProfilesResult;