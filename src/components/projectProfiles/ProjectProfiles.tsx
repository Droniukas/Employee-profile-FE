import './ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

import Project from '../../models/Project.interface';
import { ProjectsService } from '../../services/projects.service';
import ProjectForm from '../projectForm/ProjectForm';
import ProjectProfilesResult from './ProjectProfilesResults';

const ProjectProfiles = () => {
  const [results, setResults] = useState<Project[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [addedProjectId, setAddedProjectId] = useState<string>('');
  const [filterTextValue, setFilterTextValue] = useState('All');

  const projectsService = new ProjectsService();

  useEffect(() => {
    getResults();
  }, []);

  const rerenderProjects = () => {
    getResults();
  };

  const getResults = async () => {
    const result = await projectsService.getAllProjects();
    setResults(result);
  };

  const closeProjectForm = (projectId?: string) => {
    setOpenPopup(false);
    if (projectId) setAddedProjectId(projectId);
    getResults();
  };

  const handleProjectDelete = async (id: string) => {
    await projectsService.deleteProjectById(id);
    setResults(results.filter((project) => project.id !== id));
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
    })

    function onFilterValueSelection(filterValue: string) {
        setFilterTextValue(filterValue);
    }

    function setProjectStatus(project: Project) {
        const today = new Date();
        const startDateFormatted = new Date(project.startDate);
        const endDateFormatted = new Date(project.endDate);

        if (startDateFormatted > today) {
            project.status = ProjectStatus.FUTURE;
        } else {
            if (project.endDate === null || endDateFormatted > today) {
                project.status = ProjectStatus.ONGOING;
            } else {
                project.status = ProjectStatus.FINISHED;
            }
        }
    }

    return (
        <div className='project-profiles-container'>
            <Stack direction='row'>
                <Stack direction='row'
                       justifyContent='flex-start'
                       alignItems='center'
                       sx={{
                           position: 'relative',
                           width: 250,
                           left: -205,
                       }}>
                    <Box sx={{
                        position: 'relative',
                        left: 0,
                    }}>
                        <ProjectFilter filterValueSelected={onFilterValueSelection}/>
                    </Box>
                    </Stack>
                <Stack direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    sx={{
                    position: 'relative',
                        width: 300,
                        left: -180,
                    }}>
                    <Box sx={{
                        display: filteredProjectsList.length === 0 ? 'none' : 'inline',
                        color: '#000048',
                        fontSize: 14,
                    }}>
                        {filterTextValue === 'All'
                            ? filteredProjectsList.length + ' projects found'
                            : filteredProjectsList.length + ' \'' + filterTextValue + '\' projects found'}
                    </Box>
                </Stack>
                <Stack direction='row'
                       justifyContent='flex-start'
                       alignItems='center'
                       sx={{
                           position: 'relative',
                           width: 145,
                           left: 440,
                       }}>
                    <Box sx={{
                        position: 'relative',
                        left: 0,
                    }}>
                        <Button type='submit'
                                variant='contained'
                                id='addNewProject'
                                onClick={() => setOpenPopup(true)}
                                sx={{
                                    my: 1,
                                }}>
                            Add new project
                        </Button>
                    </Box>
                </Stack>
            </Stack>
            {openPopup && <ProjectForm onClose={closeProjectForm} />}
            <Box sx={{
                position: 'relative',
                my: 2,
                width: 1344,
                left: -205,
            }}>
                <ProjectProfilesResult
                                        rerender={rerenderProjects}
                                        results={filteredProjectsList}
                                       handleProjectDelete={handleProjectDelete}
                                       focusProjectId={addedProjectId}
                                       filterStatus={filterTextValue}/>
            </Box>
        </div>
    );
};

export default ProjectProfiles;
