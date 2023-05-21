import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, InputLabel, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import MyProject from '../../models/MyProject.interface';
import { responsibilitiesSchema } from '../../schemas/myResponsibilitySchema';
import { ProjectsService } from '../../services/projects.service';
import { UserStateRoot } from '../../store/types/user';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import ProjectStatusColor from '../projectProfiles/ProjectStatusColor';
import { projectProfileDateFormat } from '../utilities/projectProfileDateFormat';

type MyProjectEditViewProps = {
  onClose: (projectId?: number) => void;
  myProject: MyProject;
  snackbarProps?: {
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  };
  forceViewMode?: boolean;
};

const MyProjectEditView: React.FC<MyProjectEditViewProps> = (props: MyProjectEditViewProps) => {
  const { onClose, myProject, snackbarProps, forceViewMode } = props;

  const projectsService = new ProjectsService();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const user = useSelector((state: UserStateRoot) => state.userState.value);

  let initialValues: MyProject = {
    id: Number(''),
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    projectEmployeeStartDate: dayjs().toISOString(),
    projectEmployeeEndDate: '',
    responsibilities: '',
    status: '',
  };
  if (myProject) initialValues = myProject;

  const handleFormSubmit = async () => {
    values.responsibilities.trim();
    const result = await projectsService.updateMyProject(values, user.id);
    onClose();
  };

  const projectForm = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: responsibilitiesSchema,
  });

  const { values, dirty, handleBlur, handleChange, handleSubmit } = projectForm;
  const showInViewMode = window.location.href.includes('employeeId') || forceViewMode;

  let titleText = '';
  if (showInViewMode) {
    titleText = 'View employee project profile';
  } else if (myProject.responsibilities) {
    titleText = 'Edit your responsibilities';
  } else {
    titleText = 'Add your responsibilities';
  }

  const handleSave = () => {
    handleSubmit();
    if (snackbarProps && dirty) {
      snackbarProps.setOpenSnackbar(true);
      snackbarProps.setSnackbarMessage(`Project "${myProject.title}" successfully updated.`);
    }
  };

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <ConfirmationDialog
        open={confirmationDialog}
        onCancel={() => setConfirmationDialog(false)}
        onConfirm={() => onClose()}
      />
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
          {titleText}
        </Typography>
        <Box>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Project title</Typography>
          </InputLabel>
          <Box mr={6} sx={{ display: 'inline-block', alignItems: 'center', position: 'relative', top: 8 }}>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 400,
                color: 'primary.main',
              }}
            >
              {values.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'inline-block', alignItems: 'center', position: 'relative', top: 3, left: 25 }}>
            <ProjectStatusColor projectStatus={myProject.status} />
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            my: 4,
          }}
        >
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Description</Typography>
          </InputLabel>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>{values.description}</Typography>
        </Box>
        <Box display={'flex'}>
          <Box mr={6} sx={{ display: 'inline-block', alignItems: 'center', position: 'relative', top: 12 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Title</Typography>
            </InputLabel>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>{user.title}</Typography>
          </Box>
          <Box marginX={6} sx={{ alignItems: 'center', position: 'relative', top: 12 }}>
            <InputLabel>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Timeline</Typography>
            </InputLabel>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'primary.main' }}>
              <>
                <>
                  {'From '} {projectProfileDateFormat(myProject.projectEmployeeStartDate)}
                  {myProject.projectEmployeeEndDate
                    ? ' to ' + projectProfileDateFormat(myProject.projectEmployeeEndDate)
                    : ''}
                </>
              </>
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            color: 'primary.main',
            my: 4,
            height: `${showInViewMode ? '230px' : 0}`,
          }}
        >
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>My responsibilities</Typography>
          </InputLabel>
          {showInViewMode ? (
            values.responsibilities !== null ? (
              values.responsibilities
            ) : (
              'No responsibilities'
            )
          ) : (
            <TextField
              onBlur={handleBlur}
              name={'responsibilities'}
              hiddenLabel
              onChange={handleChange}
              variant="outlined"
              value={values.responsibilities === null ? '' : values.responsibilities}
              placeholder="e.g., Give more details about your role, responsibilities and main tasks in the project."
              fullWidth
              multiline
              rows={8}
              inputProps={{ maxLength: 2000 }}
              sx={{
                '& fieldset': {
                  borderRadius: 2,
                },
              }}
            />
          )}
        </Box>
        {!showInViewMode && (
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
            <Button sx={{ m: 1 }} variant="contained" onClick={() => handleSave()}>
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default MyProjectEditView;
