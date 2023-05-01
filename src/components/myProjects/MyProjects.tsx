import '../projectProfiles/ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';

import Project from '../../models/Project.interface';
import { ProjectsService } from '../../services/projects.service';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectFilter from '../projectProfiles/ProjectFilter';
import MyProjectProfilesResult from './MyProjectProfilesResults';

const MyProjectProfiles = () => {
  const [results, setResults] = useState<Project[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [filterTextValue, setFilterTextValue] = useState('All');

  const projectsService = new ProjectsService();

  useEffect(() => {
    getResults();
  }, []);

  const rerenderProjects = () => {
    getResults();
  };

  const getResults = async () => {
    const result = await projectsService.getMyProjects();
    setResults(result);
  };

  const filteredProjectsList = results.filter((project) => {
    if (filterTextValue === ProjectStatus.ONGOING) {
      return project.status === ProjectStatus.ONGOING;
    } else if (filterTextValue === ProjectStatus.FINISHED) {
      return project.status === ProjectStatus.FINISHED;
    } else if (filterTextValue === ProjectStatus.FUTURE) {
      return project.status === ProjectStatus.FUTURE;
    } else {
      return project;
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
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 300,
            left: -180,
          }}
        >
          <Box
            sx={{
              display: filteredProjectsList.length === 0 ? 'none' : 'inline',
              color: '#000048',
              fontSize: 14,
            }}
          >
            {filterTextValue === 'All'
              ? filteredProjectsList.length + ' projects found'
              : filteredProjectsList.length + " '" + filterTextValue + "' projects found"}
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: 145,
            left: 440,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              left: 0,
            }}
          ></Box>
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
          rerender={rerenderProjects}
          projects={filteredProjectsList}
          filterStatus={filterTextValue}
        />
      </Box>
    </div>
  );
};

export default MyProjectProfiles;
