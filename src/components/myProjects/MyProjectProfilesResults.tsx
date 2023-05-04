import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import MyProject from '../../models/MyProject.interface';
import MyProjectEmployeeResponsibilities from '../../models/MyProjectEmployeeResponsibilities.interface';
import { EmployeeService } from '../../services/employee.service';
import { ProjectsService } from '../../services/projects.service';
import ProjectStatusColor from '../projectProfiles/ProjectStatusColor';

type ProjectProfilesResultsProps = {
  myProject: MyProject[];
  rerender: () => void;
  filterStatus: string;
};

const MyProjectProfilesResult: React.FC<ProjectProfilesResultsProps> = (props: ProjectProfilesResultsProps) => {
  const { myProject, filterStatus } = props;
  const [employeeId, setEmployeeById] = useState<Employee>();

  const employeeService = new EmployeeService();

  const [response, setResponse] = useState<MyProjectEmployeeResponsibilities | null>(null);

  const getEmployeeById = async (id: string) => {
    const employeeId = await employeeService.getById(id);
    setEmployeeById(employeeId);
  };
  useEffect(() => {
    getEmployeeById(`${process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  const renderResultItem = (myProject: MyProject) => {
    const projectsService = new ProjectsService();

    const ResponsibilitiesList = (props: { projectId: string }) => {
      const { projectId } = props;
      const [responsibilities, setResponsibilities] = useState<string[] | null>(null);

      useEffect(() => {
        const getResponsibilities = async () => {
          try {
            const getResponsibilitiesFromProjectById = await projectsService.getResponsibilitiesFromProjectEmployee(
              Number(projectId),
            );

            if (Array.isArray(getResponsibilitiesFromProjectById)) {
              setResponsibilities(getResponsibilitiesFromProjectById);
            } else {
              setResponsibilities(null);
            }
          } catch (error) {
            setResponsibilities(null);
          }
        };

        getResponsibilities();
      }, [projectId]);

      if (responsibilities === null) {
        return <Typography>No responsibilities</Typography>;
      }

      return (
        <>
          {responsibilities.length > 0 ? (
            responsibilities.map((responsibility, index) => (
              <Typography key={index} fontSize="14">
                {responsibility}
              </Typography>
            ))
          ) : (
            <Typography>No responsibilities found</Typography>
          )}
        </>
      );
    };
    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();

        const inputValue = event.currentTarget?.querySelector('input')?.value;
        if (!inputValue) return;
        const data = {
          projectId: Number(myProject.id),
          employeeId: Number(`${process.env.REACT_APP_TEMP_USER_ID}`),
          responsibilities: inputValue,
        };
        try {
          const addResponsibilitiesToMyProject = await projectsService.addResponsibilitiesToProjectEmployee(data);
          setResponse(addResponsibilitiesToMyProject.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
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
                  width: 600,
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
                    {'From '} {correctDateFormat(myProject.startDate)}
                    {myProject.endDate ? ' to ' + correctDateFormat(myProject.endDate) : ''}
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
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '5',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {myProject.description}
                </Typography>
                <Box>
                  {response && (
                    <Typography
                      sx={{
                        mt: 2,
                        mb: 2,
                        color: 'primary.main',
                        fontSize: 14,
                        height: 20,
                        weight: 400,
                      }}
                    >
                      My responsibilities: {myProject.responsibilities}
                    </Typography>
                  )}
                  <Box
                    component="div"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      my: 1,
                    }}
                  >
                    <InputLabel>
                      <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#666666' }}>
                        Project Responsibilities
                      </Typography>
                    </InputLabel>
                    <Typography sx={{ fontSize: 14, color: '#666666' }}>
                      <ResponsibilitiesList projectId={String(myProject.id)} />
                    </Typography>
                  </Box>
                  <TextField
                    hiddenLabel
                    variant="standard"
                    onKeyPress={handleKeyPress}
                    placeholder="My responsibilities"
                    sx={{ color: 'primary.main' }}
                  />
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
                    {employeeId?.title}
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
                width: 544,
                left: 0,
              }}
            >
              <ProjectStatusColor projectStatus={myProject.status} />
              <Box alignItems="flex-end" display="flex">
                <IconButton
                  className="btn-edit"
                  aria-label="edit"
                  sx={{
                    color: 'primary.main',
                    position: 'relative',
                    left: 320,
                    backgroundColor: '#F4F4F4',
                  }}
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
  const correctDateFormat = (date: string) => {
    if (date === null) {
      return null;
    } else {
      return moment(date).format('YYYY/MM/DD');
    }
  };

  if (!myProject.length) {
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
              : `No '${filterStatus}' projects found. Check the filter settings.`}
          </Typography>
        </ListItem>
      </List>
    );
  } else {
    return (
      <>
        <List
          sx={{
            width: '100%',
          }}
        >
          {myProject.map((myProject) => renderResultItem(myProject))}
        </List>
      </>
    );
  }
};

export default MyProjectProfilesResult;
