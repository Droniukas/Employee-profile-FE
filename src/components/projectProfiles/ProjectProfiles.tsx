import React, {useEffect, useState} from 'react';
import './ProjectProfiles.scss';
import ProjectProfilesResult from './ProjectProfilesResults';
import {ProjectStatus} from '../enums/ProjectStatus';
import ProjectFilter from './ProjectFilter';
import ProjectsResult from '../../models/ProjectProfilesResult.interface';
import {ProjectsService} from '../../services/projects.service';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const ProjectProfiles = () => {
    const [results, setResults] = useState<ProjectsResult[]>([]);
    const [filterTextValue, updateFilterTextValue] = useState('All');

    const projectsService = new ProjectsService();

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        const result = await projectsService.getAllProjects();
        result.map((project: ProjectsResult) => (setProjectStatus(project)));
        setResults(result);
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
        updateFilterTextValue(filterValue);
    }

    function setProjectStatus(project: ProjectsResult) {
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
            <Grid container
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                      position: 'relative',
                      width: 1344,
                      left: -200,
                  }}>
                <Grid item>
                    <ProjectFilter filterValueSelected={onFilterValueSelection}/>
                </Grid>
                <Grid item
                      sx={{
                          display: filteredProjectsList.length === 0 ? 'none' : 'inline',
                      }}>
                    {filterTextValue === 'All'
                        ? filteredProjectsList.length + ' projects found'
                        : filteredProjectsList.length + ' \'' + filterTextValue + '\' projects found'}
                </Grid>
                <Grid item>
                    <Button type='submit'
                            variant='contained'
                            id='addNewProject'
                            sx={{
                                my: 1,
                            }}>
                        Add new project
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{
                position: 'relative',
                my: 2,
                width: 1344,
                left: -200,
            }}>
                <ProjectProfilesResult results={filteredProjectsList}
                                       handleProjectDelete={handleProjectDelete}
                                       filterStatus={filterTextValue}/>
            </Box>
        </div>
    );
};

export default ProjectProfiles;