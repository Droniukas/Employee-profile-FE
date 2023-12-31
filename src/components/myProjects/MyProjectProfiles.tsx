import '../projectProfiles/ProjectProfiles.scss';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Employee from '../../models/Employee.interface';
import MyProject from '../../models/MyProject.interface';
import { ProjectsService } from '../../services/projects.service';
import { UserStateRoot } from '../../store/types/user';
import { ProjectStatus } from '../enums/ProjectStatus';
import ProjectFilter from '../projectProfiles/ProjectFilter';
import MyProjectProfilesResults from './MyProjectProfilesResults';

type MyProjectProfilesProps = {
  employee: Employee;
};
const MyProjectProfiles: React.FC<MyProjectProfilesProps> = (props: MyProjectProfilesProps) => {
  const [myProjects, setProjects] = useState<MyProject[]>([]);
  const [filterTextValue, setFilterTextValue] = useState<ProjectStatus>(ProjectStatus.ALL);
  const user = useSelector((state: UserStateRoot) => state.userState.value);
  const { employee } = props;

  const projectsService = new ProjectsService();

  useEffect(() => {
    getMyProjects();
  }, []);

  const getMyProjects = async () => {
    if (!user) return;
    const myProjects = await projectsService.getMyProjects(employee.id);
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
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            position: 'relative',
            width: '100%',
            left: -30,
            paddingTop: 1,
          }}
        >
          <Box
            sx={{
              display: filteredProjectsList.length === 0 ? 'none' : 'inline',
              color: 'primary.main',
              fontSize: 14,
            }}
          >
            {filterTextValue === 'All'
              ? filteredProjectsList.length + ' projects found'
              : filteredProjectsList.length + " '" + filterTextValue + "' projects found"}
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
