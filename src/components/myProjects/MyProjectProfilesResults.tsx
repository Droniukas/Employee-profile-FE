import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import MyProject from '../../models/MyProject.interface';
import { UserStateRoot } from '../../store/types/user';
import CustomSnackbar from '../customSnackbar/CustomSnackbar';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectStatusColor from '../projectProfiles/ProjectStatusColor';
import { projectProfileDateFormat } from '../utilities/projectProfileDateFormat';
import MyProjectEditView from './MyProjectEditView';

type MyProjectProfilesResultsProps = {
  myProjects: MyProject[];
  getProjects: () => void;
  filterStatus: string;
};

const MyProjectProfilesResults: React.FC<MyProjectProfilesResultsProps> = (props: MyProjectProfilesResultsProps) => {
  const { myProjects, getProjects, filterStatus } = props;
  const [projectToEditView, setProjectToEditView] = useState<MyProject | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const closeEditViewForm = () => {
    setOpenPopup(false);
    setProjectToEditView(null);
    getProjects();
  };
  const setProject = (MyProject: MyProject) => {
    setProjectToEditView(MyProject);
    setOpenPopup(true);
  };

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
                    {'From '} {projectProfileDateFormat(myProject.projectEmployeeStartDate)}
                    {myProject.projectEmployeeEndDate
                      ? ' to ' + projectProfileDateFormat(myProject.projectEmployeeEndDate)
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
                    overflow: 'hidden',
                    whiteSpace: 'pre-wrap',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {myProject.description}
                </Typography>
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
                  {window.location.href.includes('employeeId') ? <MoreHorizIcon /> : <EditIcon />}
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
        {openPopup && projectToEditView && (
          <MyProjectEditView
            onClose={closeEditViewForm}
            myProject={projectToEditView}
            snackbarProps={{ setOpenSnackbar: setOpenSnackbar, setSnackbarMessage: setSnackbarMessage }}
          />
        )}{' '}
        <List
          sx={{
            width: '100%',
          }}
        >
          {myProjects.map((myProject) => renderResultItem(myProject))}
        </List>
        <CustomSnackbar open={openSnackbar} setOpen={setOpenSnackbar} message={snackbarMessage} />
      </>
    );
  }
};

export default MyProjectProfilesResults;
