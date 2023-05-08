import '../projectProfiles/ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import MyProject from '../../models/MyProject.interface';
import { ProjectsService } from '../../services/projects.service';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectFilter from '../projectProfiles/ProjectFilter';
import MyProjectProfilesResult from './MyProjectProfilesResults';

const MyProjectProfiles = () => {
  const [myProjects, setProjects] = useState<MyProject[]>([]);
  const [filterTextValue, setFilterTextValue] = useState('All');

  const projectsService = new ProjectsService();

  useEffect(() => {
    rerenderProjects();
  }, []);

  const rerenderProjects = async () => {
    const myProjects = await projectsService.getMyProjects();
    setProjects(myProjects);
  };

  const filteredProjectsList = myProjects.filter((myProject) => {
    if (filterTextValue === ProjectStatus.ONGOING) {
      return myProject.status === ProjectStatus.ONGOING;
    } else if (filterTextValue === ProjectStatus.FINISHED) {
      return myProject.status === ProjectStatus.FINISHED;
    } else if (filterTextValue === ProjectStatus.FUTURE) {
      return myProject.status === ProjectStatus.FUTURE;
    } else {
      return myProject;
    }
  });

  const onFilterValueSelection = (filterValue: string) => {
    setFilterTextValue(filterValue);
  };

  return (
    <div className="project-profiles-container">
      <Stack direction="row">
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 250,
            left: -205,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              left: 0,
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
          width: 1344,
          left: -205,
        }}
      >
        <MyProjectProfilesResult
          myProjects={filteredProjectsList}
          rerender={rerenderProjects}
          filterStatus={filterTextValue}
        />
      </Box>
    </div>
  );
};

export default MyProjectProfiles;
