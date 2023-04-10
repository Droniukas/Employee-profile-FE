import React, { useEffect, useState } from 'react';
import './ProjectProfiles.scss';
import ProjectProfilesResult from './ProjectProfilesResults';
import Project from '../../models/Project.interface';
import { ProjectsService } from '../../services/projects.service';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProjectForm from '../projectForm/ProjectForm';

const ProjectProfiles = () => {
  const [results, setResults] = useState<Project[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [addedProjectId, setAddedProjectId] = useState<string>('');
  const projectsService = new ProjectsService();

  useEffect(() => {
    getResults();
  }, []);

  const rerenderProjects = () => {
    getResults();
  }

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

  return (
    <div className='project-profiles-container'>
      <Box
        display='flex'
        justifyContent='flex-end'
        sx={{
          position: 'relative',
          my: 0.25,
          width: 1344,
          left: -200,
        }}
      >
        <Button
          type='submit'
          variant='contained'
          id='addNewProject'
          onClick={() => setOpenPopup(true)}
          sx={{
            my: 1,
          }}
        >
          Add new project
        </Button>
      </Box>
      {openPopup && <ProjectForm onClose={closeProjectForm} />}
      <Box
        sx={{
          position: 'relative',
          my: 2,
          width: 1344,
          left: -200,
        }}
      >
        <ProjectProfilesResult rerender={rerenderProjects} results={results} handleProjectDelete={handleProjectDelete} focusProjectId={addedProjectId}/>
      </Box>
    </div>
  );
};

export default ProjectProfiles;
function forceUpdate() {
  throw new Error('Function not implemented.');
}

