import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import MyProject from '../../models/MyProject.interface';
import { ProjectsService } from '../../services/projects.service';
import { UserStateRoot } from '../../store/types/user';
import { ProjectStatus } from '../enums/ProjectStatus';
import { correctDateFormat } from '../projectProfiles/ProjectProfiles';
import ProjectStatusColor from '../projectProfiles/ProjectStatusColor';
import MyProjectEdit from './MyProjectEdit';

type MyProjectProfilesResultsProps = {
  myProjects: MyProject[];
  getProjects: () => void;
  filterStatus: string;
};

const MyProjectProfilesResults: React.FC<MyProjectProfilesResultsProps> = (props: MyProjectProfilesResultsProps) => {
  const { myProjects, getProjects, filterStatus } = props;
  const [projectToEdit, setProjectToEdit] = useState<MyProject | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const projectsService = new ProjectsService();

  const closeEditForm = () => {
    setOpenPopup(false);
    setProjectToEdit(null);
    getProjects();
  };
  const setProject = (MyProject: MyProject) => {
    setProjectToEdit(MyProject);
    setOpenPopup(true);
  };
  // const correctDateFormat = (date: string) => {
  //   return date === null ? null : moment(date).format('YYYY/MM/DD');
  // };

  const renderResultItem = (myProject: MyProject) => {
    return (
      <div key={myProject.id}>
        <ListItem
          alignItems="flex-start"
          sx={{
            border: 1,
            borderColor: '#DDDDDD',
            borderRadius: 2,
            backgroundColor: 'white',
            mb: 1,
            height: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                width: '90%',
                position: 'relative',
                marginRight: '150px',
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
                  position: 'relative',
                }}
              >
                <FolderIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: 26,
                    width: 56,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: 'auto',
                  position: 'relative',
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
                    {'From '} {correctDateFormat(myProject.projectEmployeeStartDate)}
                    {myProject.projectEmployeeEndDate
                      ? ' to ' + correctDateFormat(myProject.projectEmployeeEndDate)
                      : ''}
                  </>
                </Typography>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: 20,
                  }}
                >
                  {myProject.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#666666',
                    fontSize: 14,
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '5',
                  }}
                >
                  {myProject.description}
                </Typography>
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'realitive',
                    my: 1,
                  }}
                >
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 2,
                      color: 'primary.main',
                      fontSize: 14,
                      height: 20,
                      fontWeight: 500,
                    }}
                  >
                    {user.title}
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                position: 'relative',
                width: 200,
                right: 35,
                alignItems: 'center',
              }}
            >
              <ProjectStatusColor projectStatus={myProject.status} />
              <Box alignItems="flex-end" display="flex">
                <IconButton
                  className="btn-edit"
                  aria-label="edit"
                  sx={{
                    color: 'primary.main',
                    left: '3vh',
                    backgroundColor: '#F4F4F4',
                  }}
                  onClick={() => setProject(myProject)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </ListItem>
      </div>
    );
  };

  if (!myProjects.length) {
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
            {filterStatus === `${ProjectStatus.ALL}`
              ? 'No projects added.'
              : `No '${filterStatus}' projects found. Check the filter settings.`}
          </Typography>
        </ListItem>
      </List>
    );
  } else {
    return (
      <>
        {openPopup && projectToEdit && <MyProjectEdit onClose={closeEditForm} myProject={projectToEdit} />}
        <List
          sx={{
            width: '100%',
          }}
        >
          {myProjects.map((myProject) => renderResultItem(myProject))}
        </List>
      </>
    );
  }
};

export default MyProjectProfilesResults;
