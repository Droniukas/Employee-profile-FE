import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

import Project from '../../models/Project.interface';
import ProjectEmployee from '../../models/ProjectEmployee.interface';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectForm from '../projectForm/ProjectForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

type ProjectProfilesResultsProps = {
  projects: Project[];
  rerender: () => void;
  handleProjectDelete: (id: number) => void;
  focusProjectId?: number;
  filterStatus: string;
};

const ProjectProfilesResult: React.FC<ProjectProfilesResultsProps> = (props: ProjectProfilesResultsProps) => {
  const { projects, rerender, handleProjectDelete, focusProjectId, filterStatus } = props;

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const buttonToFocusRef = useRef<HTMLButtonElement>(null);

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

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteConfirmation(true);
  };

  const renderResultItem = (project: Project) => {
    const isTextOverflow = project.description.length > 135;
    return (
      <div key={project.id}>
        <ListItem
          alignItems="flex-start"
          sx={{
            border: 1,
            borderColor: '#DDDDDD',
            borderRadius: 2,
            backgroundColor: 'white',
            mb: 1,
          }}
        >
          <Stack direction="row">
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                position: 'relative',
                width: 800,
                left: 0,
              }}
            >
              <Box
                display="flex"
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
                    color: 'primary.main',
                    fontSize: 26,
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: 400,
                  left: 25,
                }}
              >
                <Typography
                  sx={{
                    color: '#666666',
                    fontSize: 14,
                    pt: 1,
                  }}
                >
                  <>
                    {correctDateFormat(project.startDate)} -{' '}
                    {project.endDate ? correctDateFormat(project.endDate) : 'Present'}
                  </>
                </Typography>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: 20,
                  }}
                >
                  {project.title}
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
                  {!isTextOverflow ? project.description : project.description.substring(0, 135) + '...'}
                  <Button
                    onClick={() => setProject(project)}
                    sx={{
                      textDecoration: 'underline',
                      color: 'primary.main',
                      fontSize: 14,
                      height: 15,
                    }}
                  >
                    Show more
                  </Button>
                </Typography>
              </Box>
              <Box
                alignItems="flex-start"
                display="flex"
                sx={{
                  position: 'relative',
                  left: 70,
                }}
              >
                {renderEmployeesAvatarGroup(project.projectEmployees)}
              </Box>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                position: 'relative',
                width: 544,
                left: 0,
              }}
            >
              {setStatusColors(project.status)}
              <Box alignItems="flex-end" display="flex">
                <IconButton
                  ref={focusProjectId === project.id ? buttonToFocusRef : null}
                  className="btn-edit"
                  aria-label="edit"
                  sx={{
                    color: 'primary.main',
                    position: 'relative',
                    left: 320,
                    backgroundColor: '#F4F4F4',
                  }}
                  onClick={() => setProject(project)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="btn-delete"
                  aria-label="delete"
                  sx={{
                    color: 'primary.main',
                    position: 'relative',
                    left: 335,
                    backgroundColor: '#F4F4F4',
                  }}
                  onClick={() => handleDeleteClick(project)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </ListItem>
      </div>
    );
  };

  const correctDateFormat = (date: string) => {
    if (date === null) {
      return null;
    } else {
      return moment(date).format('YYYY/MM/DD');
    }
  };

  const renderEmployeesAvatarGroup = (employees: ProjectEmployee[]) => {
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
    });

    return (
      <>
        <AvatarGroup>{filteredEmployeesList.map((employee) => renderEmployeeAvatar(employee))}</AvatarGroup>
        <Typography
          sx={{
            color: '#666666',
            fontSize: 14,
            pt: 2,
            position: 'relative',
            left: 10,
            top: -13,
            display: additionalEmployees === 0 ? 'none' : 'inline',
          }}
        >
          +{additionalEmployees} {additionalEmployees === 1 ? 'employee' : 'employees'}
        </Typography>
      </>
    );
  };

  const renderEmployeeAvatar = (employee: ProjectEmployee) => {
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
  };

  const setStatusColors = (projectStatus: string) => {
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
        <Box
          display="flex"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 90,
            height: 28,
            position: 'relative',
            left: 0,
            borderRadius: 1,
            background: statusColor,
            color: fontColor,
            fontSize: 14,
          }}
        >
          {projectStatus}
        </Box>
      </>
    );
  };

  if (!projects.length) {
    return (
      <List
        sx={{
          width: '100%',
        }}
      >
        <ListItem alignItems="flex-start">
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: 20,
            }}
          >
            {filterStatus === 'All'
              ? 'No projects added.'
              : "No '" + filterStatus + "' projects found. Check the filter settings."}
          </Typography>
        </ListItem>
      </List>
    );
  } else {
    return (
      <>
        {openPopup && projectToEdit && <ProjectForm onClose={closeEditForm} project={projectToEdit} />}
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
          {projects.map((project) => renderResultItem(project))}
        </List>
      </>
    );
  }
};

export default ProjectProfilesResult;
