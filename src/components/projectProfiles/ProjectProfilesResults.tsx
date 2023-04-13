import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import Employee from '../../models/Employee.interface';
import Project from '../../models/Project.interface';
import ProjectForm from '../projectForm/ProjectForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

type Props = {
  results: Project[];
  rerender: () => void;
  handleProjectDelete: (id: string) => void;
  focusProjectId?: string;
};

const ProjectProfilesResult: React.FC<Props> = ({
  results,
  handleProjectDelete,
  focusProjectId,
  rerender,
}) => {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const buttonToFocusRef = useRef<HTMLButtonElement>(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const closeEditForm = () => {
    setOpenPopup(false);
    setProjectToEdit(null);
    rerender();
  };

  useEffect(() => {
    if (buttonToFocusRef.current) {
      buttonToFocusRef.current.focus();
    }
  }, [buttonToFocusRef.current]);

  const setProject = (project: Project) => {
    setProjectToEdit(project);
    setOpenPopup(true);
  };

  const handleDeleteConfirmationClose = () => {
    setProjectToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteClick = (result: Project) => {
    setProjectToDelete(result);
    setShowDeleteConfirmation(true);
  };

  function renderResultItem(result: Project) {
    return (
      <div key={result.id}>
        <ListItem
          alignItems='flex-start'
          sx={{
            border: 1,
            borderColor: '#DDDDDD',
            borderRadius: 2,
            backgroundColor: 'white',
            mb: 1,
          }}
        >
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={0.5}
          >
            <Grid item xs={1}>
              <Box
                display='flex'
                sx={{
                  border: 1,
                  borderColor: '#DDDDDD',
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FolderIcon
                  sx={{
                    color: '#000048',
                    fontSize: 26,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{
                  color: '#666666',
                  fontSize: 14,
                  pt: 1,
                }}
              >
                {correctDateFormat(result.startDate)} - -{' '}
                {result.endDate ? correctDateFormat(result.endDate) : 'Present'}
              </Typography>
              <Typography
                sx={{
                  color: '#000048',
                  fontSize: 20,
                }}
              >
                {result.title}
              </Typography>
              <Typography
                sx={{
                  color: '#666666',
                  fontSize: 14,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {result.description}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box alignItems='flex-start' display='flex'>
                {renderEmployeesAvatarGroup(result.employees)}
              </Box>
              <Box alignItems='flex-end' display='flex'>
                {setStatus(result.startDate, result.endDate)}
                <IconButton
                  ref={focusProjectId === result.id ? buttonToFocusRef : null}
                  className='btn-edit'
                  aria-label='edit'
                  sx={{
                    color: '#000048',
                    position: 'relative',
                    left: 455,
                    top: -35,
                    backgroundColor: '#F4F4F4',
                  }}
                  onClick={() => setProject(result)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className='btn-delete'
                  aria-label='delete'
                  sx={{
                    color: '#000048',
                    position: 'relative',
                    left: 470,
                    top: -35,
                    backgroundColor: '#F4F4F4',
                  }}
                  onClick={() => handleDeleteClick(result)}
                >
                  <DeleteIcon />
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
      return new Date(date).toDateString();
    }
  }

  function renderEmployeesAvatarGroup(employees: Employee[]) {
    const employeeAmount = employees.length;
    const avatarsNeed = Math.min(3, employeeAmount);
    const employeesForAvatars = [];

    for (let i = 0; i < avatarsNeed; i++) {
      employeesForAvatars[i] = employees[i];
    }

    return (
      <>
        <AvatarGroup>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              display: {
                xs: 'none',
              },
            }}
          />
          {employeesForAvatars.map((employee) => renderEmployeeAvatar(employee))}
        </AvatarGroup>
        {calculateAdditionalEmployees(employeeAmount)}
      </>
    );
  }

  function renderEmployeeAvatar(employee: Employee) {
    return (
      <Avatar
        key={employee.id}
        src={`data:${employee.imageType};base64,${employee.imageBytes}`}
        sx={{
          width: 24,
          height: 24,
        }}
      />
    );
  }

  function calculateAdditionalEmployees(avatarsUsed: number) {
    if (avatarsUsed > 3) {
      const additionalemployees = avatarsUsed - 3;
      return (
        <Typography
          sx={{
            color: '#666666',
            fontSize: 14,
            pt: 2,
            position: 'relative',
            left: 10,
            top: -13,
          }}
        >
          +{additionalemployees} {additionalemployees === 1 ? 'employee' : 'employees'}
        </Typography>
      );
    }
  }

  function setStatus(startDate: string, endDate: string) {
    let statusColor;
    let fontColor;
    let projectStatus;
    const today = new Date();
    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    if (startDateFormatted > today) {
      projectStatus = 'Future';
      statusColor = 'rgba(113, 175, 251, 0.31)';
      fontColor = 'rgba(0, 114, 255, 1)';
    } else {
      if (endDate === null || endDateFormatted > today) {
        projectStatus = 'Ongoing';
        statusColor = 'rgba(59, 248, 100, 0.24)';
        fontColor = 'rgba(26, 175, 85, 1)';
      } else {
        projectStatus = 'Finished';
        statusColor = 'rgba(92, 92, 92, 0.23)';
        fontColor = 'rgba(50, 50, 50, 1)';
      }
    }

    return (
      <>
        <Box
          display='flex'
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
          }}
        >
          {projectStatus}
        </Box>
      </>
    );
  }

  if (!results.length) {
    return (
      <List
        sx={{
          width: '100%',
        }}
      >
        <ListItem alignItems='flex-start'>
          <Typography
            sx={{
              color: '#000048',
              fontSize: 20,
            }}
          >
            No projects added.
          </Typography>
        </ListItem>
      </List>
    );
  } else {
    return (
      <>
        {openPopup && projectToEdit && (
          <ProjectForm onClose={closeEditForm} project={projectToEdit} />
        )}
        {showDeleteConfirmation && projectToDelete && (
          <DeleteConfirmationDialog
            project={projectToDelete}
            onClose={handleDeleteConfirmationClose}
            onDelete={handleProjectDelete}
          />
        )}
        <List
          sx={{
            width: '100%',
          }}
        >
          {results.map((result) => renderResultItem(result))}
        </List>
      </>
    );
  }
};

export default ProjectProfilesResult;
