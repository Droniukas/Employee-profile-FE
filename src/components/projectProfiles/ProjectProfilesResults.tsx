import React, {useState} from 'react';
import ProjectsResult from '../../models/ProjectProfilesResult.interface';
import Employee from '../../models/Employee.interface';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import {ProjectStatus} from '../enums/ProjectStatus';

type Props = {
    results: ProjectsResult[];
    handleProjectDelete: (id: string) => void;
    filterStatus: string;
};

const ProjectProfilesResult: React.FC<Props> = ({results, handleProjectDelete, filterStatus}) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<ProjectsResult | null>(null);

    const handleDeleteConfirmationClose = () => {
        setProjectToDelete(null);
        setShowDeleteConfirmation(false);
    };

    const handleDeleteClick = (result: ProjectsResult) => {
        setProjectToDelete(result);
        setShowDeleteConfirmation(true);
    };

    function renderResultItem(result: ProjectsResult) {
        return (
            <div key={result.id}>
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
                                {correctDateFormat(result.startDate)} - {result.endDate ? correctDateFormat(result.endDate) : 'Present'}
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
                                {renderEmployeesAvatarGroup(result.employees)}
                            </Box>
                            <Box alignItems='flex-end'
                                 display='flex'>
                                {setStatusColors(result.status)}
                                <IconButton className='btn-edit' aria-label='edit'
                                            sx={{
                                                color: '#000048',
                                                position: 'relative',
                                                left: 455,
                                                top: -35,
                                                backgroundColor: '#F4F4F4',
                                            }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton className='btn-delete' aria-label='delete'
                                            sx={{
                                                color: '#000048',
                                                position: 'relative',
                                                left: 470,
                                                top: -35,
                                                backgroundColor: '#F4F4F4',
                                            }}
                                            onClick={() => handleDeleteClick(result)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </ListItem>
            </div>
        );
    }

    function correctDateFormat(date: string) {
        if (date === null) {
            return null;
        } else {
            return (new Date(date)).toDateString();
        }
    }

    function renderEmployeesAvatarGroup(employees: Employee[]) {
        const avatarsNeed = 3;
        let counter = 0;
        let additionalEmployees = 0;

        const filteredEmployeesList = employees.filter((employee) => {
            if (employee.status === 'ACTIVE') {
                if (counter < avatarsNeed) {
                    counter++;
                    return employee;
                } else {
                    additionalEmployees++;
                }
            }
        })

        return (
            <>
                <AvatarGroup>
                    {filteredEmployeesList.map((employee) => (renderEmployeeAvatar(employee)))}
                </AvatarGroup>
                <Typography sx={{
                    color: '#666666',
                    fontSize: 14,
                    pt: 2,
                    position: 'relative',
                    left: 10,
                    top: -13,
                    display: additionalEmployees === 0 ? 'none' : 'inline',
                }}>
                    +{additionalEmployees} {additionalEmployees === 1 ? 'employee' : 'employees'}
                </Typography>
            </>
        );
    }

    function renderEmployeeAvatar(employee: Employee) {
        return (
            <Avatar key={employee.id}
                    src={`data:${employee.imageType};base64,${employee.imageBytes}`}
                    sx={{
                        width: 24,
                        height: 24,
                    }}/>
        );
    }

    function setStatusColors(projectStatus: string) {
        let statusColor;
        let fontColor;

        if (projectStatus === ProjectStatus.FUTURE) {
            statusColor = 'rgba(113, 175, 251, 0.31)';
            fontColor = 'rgba(0, 114, 255, 1)';
        } else if (projectStatus === ProjectStatus.ONGOING) {
            statusColor = 'rgba(59, 248, 100, 0.24)';
            fontColor = 'rgba(26, 175, 85, 1)';
        } else if (projectStatus === ProjectStatus.FINISHED) {
            statusColor = 'rgba(92, 92, 92, 0.23)';
            fontColor = 'rgba(50, 50, 50, 1)';
        }

        return (
            <>
                <Box display='flex'
                     sx={{
                         position: 'relative',
                         left: 270,
                         top: -40,
                         background: statusColor,
                         color: fontColor,
                         borderRadius: 1,
                         fontSize: 14,
                         width: 90,
                         height: 28,
                         justifyContent: 'center',
                         alignItems: 'center',
                     }}>
                    {projectStatus}
                </Box>
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
                        {filterStatus === 'All'
                            ? 'No projects added.'
                            : 'No \'' + filterStatus + '\' products found. Check the filter settings.'}
                    </Typography>
                </ListItem>
            </List>
        );
    } else {
        return (
            <>
                <List sx={{
                    width: '100%',
                }}>
                    {results.map((result) => (renderResultItem(result)))}
                </List>
                {(showDeleteConfirmation && projectToDelete) && (
                    <DeleteConfirmationDialog
                        project={projectToDelete}
                        onClose={handleDeleteConfirmationClose}
                        onDelete={handleProjectDelete}
                    />
                )}
            </>
        );
    }
};

export default ProjectProfilesResult;