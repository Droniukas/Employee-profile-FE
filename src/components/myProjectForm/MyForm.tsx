import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import Employee from '../../models/Employee.interface';
import MyProjectEmployee from '../../models/MyProjectEmployee';
import Project from '../../models/Project.interface';
import { responsibilitiesSchema } from '../../schemas/myResponsibilitySchema';
import { EmployeeService } from '../../services/employee.service';
import { ProjectsService } from '../../services/projects.service';
import { ProjectStatus } from '../enums/ProjectStatus';

type ProjectFormProps = {
  onClose: (projectId?: number) => void;
  project?: Project;
  showEndDate: boolean;
};

const MyForm: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
  const { onClose, project, showEndDate } = props;

  const projectsService = new ProjectsService();

  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [resultemployee, setResults] = useState<Employee>();
  const employeeService = new EmployeeService();

  const getResults = async (id: string) => {
    const resultemployee = await employeeService.getById(id);
    setResults(resultemployee);
  };

  useEffect(() => {
    getResults(`${process.env.REACT_APP_TEMP_USER_ID}`);
  }, []);

  let initialValues: Project = {
    title: '',
    description: '',
    startDate: dayjs().toISOString(),
    endDate: '',
    projectEmployees: [],
    status: '',
  };
  let myPEValues: MyProjectEmployee = {
    responsibilities: '',
  };
  // let projectId: Project[id] == ProjectEmployee[id]

  const setStatusColors = (projectStatus: string) => {
    let statusColor;
    let fontColor;

    if (projectStatus === ProjectStatus.FUTURE) {
      statusColor = 'rgba(113, 175, 251, 0.31)';
      fontColor = 'rgba(0, 114, 255, 1)';
    } else if (projectStatus === ProjectStatus.ONGOING) {
      statusColor = 'rgba(59, 248, 100, 0.24)';
      fontColor = 'rgba(26, 175, 85, 1)';
    } else if (projectStatus === ProjectStatus.FINISHED) {
      statusColor = 'rgba(92, 92, 92, 0.23)';
      fontColor = 'rgba(50, 50, 50, 1)';
    }

    return (
      <>
        <Box
          display="flex"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 90,
            height: 28,
            position: 'relative',
            left: 0,
            borderRadius: 1,
            background: statusColor,
            color: fontColor,
            fontSize: 14,
          }}
        >
          {projectStatus}
        </Box>
      </>
    );
  };
  const correctDateFormat = (date: string) => {
    if (date === null) {
      return null;
    } else {
      return moment(date).format('YYYY/MM/DD');
    }
  };

  const handleFormSubmit = async () => {
    let result;
    if (project) {
      result = await projectsService.addResponsibilitiesToForm(inputValue);
      onClose();
    } else {
      result = await projectsService.addResponsibilitiesToForm(inputValue);
      onClose(result.id);
    }
  };

  if (project) {
    initialValues = project;
  }
  const { values, touched, errors, dirty, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: responsibilitiesSchema,
  });

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const ResponsibilitiesList = () => {
    const projectId = values.id;
    const [responsibilities, setResponsibilities] = useState<string[] | null>(null);

    useEffect(() => {
      const getResponsibilities = async () => {
        try {
          const result = await projectsService.getResponsibilitiesFromProjectEmployee(projectId);
          console.log('Responsibilities result:', result);

          if (Array.isArray(result)) {
            setResponsibilities(result);
          } else {
            console.error('Unexpected response from server:', result);
            setResponsibilities(null);
          }
        } catch (error) {
          console.error(error);
          setResponsibilities(null);
        }
      };

      getResponsibilities();
    }, [projectId]);
    console.log('Responsibilities:', responsibilities);

    if (responsibilities === null) {
      return <Typography>Loading...</Typography>;
    }

    return (
      <>
        {responsibilities.length > 0 ? (
          responsibilities.map((responsibility, index) => <Typography key={index}>{responsibility}</Typography>)
        ) : (
          <Typography>No responsibilities found</Typography>
        )}
      </>
    );
  };
  const [response, setResponse] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const projectId = values.id;

  const handleTextFieldChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!inputValue) return;
    const data = {
      projectId: projectId,
      employeeId: `${process.env.REACT_APP_TEMP_USER_ID}`,
      responsibilities: inputValue,
    };
    try {
      const res = await projectsService.addResponsibilitiesToProjectEmployee(data);
      setResponse(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      console.log(data);
      console.log(error);
    }
    onClose();
  };

  return (
    <Dialog open={true} maxWidth="md">
      <Dialog open={confirmationDialog} maxWidth="xl">
        <DialogTitle>Confirm exit</DialogTitle>
        <DialogContent>
          <Typography>Changes will be lost, are you sure you want to leave?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(false)} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={() => onClose()} sx={{ m: 1 }} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box display={'flex'} justifyContent={'flex-end'} mr={1} mt={2}>
        <Button
          sx={{ width: 15, height: 30 }}
          onClick={() => {
            dirty ? setConfirmationDialog(true) : onClose();
          }}
        >
          <CloseIcon fontSize="medium" />
        </Button>
      </Box>
      <Box component="form" sx={{ marginX: 5, marginY: 3 }}>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontWeight: 400,
            fontSize: 25,
            fontStyle: 'Regular',
            color: 'primary.main',
          }}
        >
          {project ? 'Edit your responsibilities' : 'Add your profile'}
        </Typography>
        <Box>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Project title</Typography>
          </InputLabel>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 400,
              color: 'primary.main',
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          >
            {values.title}
          </Typography>
        </Box>
        {/* description input */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            my: 2,
          }}
        >
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Description</Typography>
          </InputLabel>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>{values.description}</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#666666',
              fontSize: 14,
              pt: 1,
            }}
          ></Typography>
        </Box>
        <Box display={'flex'} sx={{}}>
          <Box mr={4} sx={{ display: 'inline-block', alignItems: 'center', position: 'relative', top: 12 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Status</Typography>
            </InputLabel>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>
              {setStatusColors(project?.status || '')}
            </Typography>
          </Box>
          <Box marginX={8} sx={{ alignItems: 'center', position: 'relative', top: 12 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Role</Typography>
            </InputLabel>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>
              <>
                {correctDateFormat(initialValues.startDate)} -{' '}
                {initialValues.endDate ? correctDateFormat(initialValues.endDate) : 'Present'}
              </>
            </Typography>
          </Box>
          <Box mr={10} sx={{ display: 'inline-block', alignItems: 'center', position: 'relative', top: 12 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Status</Typography>
            </InputLabel>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>
              {resultemployee?.title}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            my: 2,
            '&::before, &::after': {
              borderColor: '999999',
            },
          }}
        ></Divider>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            my: 2,
          }}
        >
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>My responsibilities</Typography>
          </InputLabel>
          <TextField
            onBlur={handleBlur}
            name={'responsibilities'}
            value={inputValue}
            onChange={handleTextFieldChange}
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            inputProps={{ maxLength: 1000 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Divider />
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            variant="contained"
            color="info"
            sx={{ m: 1 }}
            onClick={() => {
              dirty ? setConfirmationDialog(true) : onClose();
            }}
          >
            Cancel
          </Button>
          <Button sx={{ m: 1 }} variant="contained" onClick={() => handleButtonClick()}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MyForm;
