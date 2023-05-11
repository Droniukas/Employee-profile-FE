import '../projectProfiles/ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import MyProject from '../../models/MyProject.interface';
import { ProjectsService } from '../../services/projects.service';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectFilter from '../projectProfiles/ProjectFilter';
import MyProjectProfilesResults from './MyProjectProfilesResults';

const MyProjectProfiles = () => {
  const [myProjects, setProjects] = useState<MyProject[]>([]);
  const [filterTextValue, setFilterTextValue] = useState<ProjectStatus>(ProjectStatus.ALL);

  const projectsService = new ProjectsService();

  useEffect(() => {
    getMyProjects();
  }, []);

  const getMyProjects = async () => {
    const myProjects = await projectsService.getMyProjects();
    setProjects(myProjects);
  };

  const filteredProjectsList = myProjects.filter((myProject) => {
    if (filterTextValue !== ProjectStatus.ALL) {
      return filterTextValue === myProject.status;
    } else return true;
  });

  const onFilterValueSelection = (filterValue: ProjectStatus) => {
    setFilterTextValue(filterValue);
  };

  return (
    <div className="project-profiles-container">
      <Stack direction="row" sx={{ width: '70vw' }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 275,
            right: 0,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              left: 0,
              paddingTop: 1,
            }}
          >
            <ProjectFilter onFilterValueSelection={onFilterValueSelection} />
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          position: 'relative',
          my: 2,
          width: '100%',
          left: 0,
        }}
      >
        <MyProjectProfilesResults
          myProjects={filteredProjectsList}
          getProjects={getMyProjects}
          filterStatus={filterTextValue}
        />
      </Box>
    </div>
  );
};

export default MyProjectProfiles;
