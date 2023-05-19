import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import React, { useMemo, useRef, useState } from 'react';

import CreateEmployee from '../../models/CreateEmployee.interface';
import Title from '../../models/Title.interface';
import { employeeSchema } from '../../schemas/employeeSchema';
import { EmployeeService } from '../../services/employee.service';
import { TitleService } from '../../services/title.service';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import { EmployeeStatus } from './employeeStatus';

type EmployeeFormProps = {
  onClose: () => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = (props: EmployeeFormProps) => {
  const { onClose } = props;
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const titleService = new TitleService();
  const employeeService = new EmployeeService();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [emailValid, setEmailValid] = useState(true);

  const getAllTitles = async () => {
    const response = await titleService.getAllTitles();
    setTitles(response);
  };

  useMemo(() => getAllTitles(), []);

  const initialValues: CreateEmployee = {
    name: '',
    surname: '',
    middleName: '',
    titleId: null,
    status: EmployeeStatus.ACTIVE,
    isManager: false,
    image: null,
    email: '',
    password: '',
  };

  const handleFormSubmit = async () => {
    await checkIfEmailExists(values.email);
    if (emailValid) {
      await employeeService.createEmployee(values);
      onClose();
    }
  };

  const employeeForm = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: employeeSchema,
  });

  const {
    values,
    touched,
    errors,
    dirty,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleSubmit,
  } = employeeForm;

  const handleTitleChange = (event: SelectChangeEvent) => {
    setFieldTouched('titleId');
    setFieldValue('titleId', event.target.value);
    setSelectedTitle(event.target.value);
  };

  const checkIfEmailExists = async (email: string) => {
    try {
      const response = await employeeService.validateEmail(email);
      setEmailValid(!response.exists);
    } catch (error) {
      throw new Error('Error validating email');
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

      <Box marginX={5} marginTop={3} marginBottom={3}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 400,
            fontSize: 25,
            fontStyle: 'Regular',
            color: 'primary.main',
          }}
        >
          Create employee
        </Typography>
      </Box>
      <Grid marginX={5} marginBottom={3} container spacing={3} width={'90%'}>
        {/* Name inputs */}
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Name</Typography>
          </InputLabel>
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            size="small"
            variant="outlined"
            name={'name'}
            inputProps={{ maxLength: 35 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Middle Name</Typography>
          </InputLabel>
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.middleName}
            error={touched.middleName && Boolean(errors.middleName)}
            helperText={touched.middleName && errors.middleName}
            size="small"
            variant="outlined"
            name={'middleName'}
            inputProps={{ maxLength: 35 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Surname</Typography>
          </InputLabel>
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname}
            error={touched.surname && Boolean(errors.surname)}
            helperText={touched.surname && errors.surname}
            size="small"
            variant="outlined"
            name={'surname'}
            inputProps={{ maxLength: 35 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Image</Typography>
          </InputLabel>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg, image/webp"
            ref={imageInputRef}
            onChange={(event) => {
              if (event.target.files) {
                setFieldTouched('image');
                setFieldValue('image', event.target.files[0]);
              }
            }}
            style={{ display: 'none' }}
          />
          <OutlinedInput
            size="small"
            placeholder="Select an image"
            fullWidth
            name="image"
            value={values.image ? values.image.name : ''}
            error={touched.image && Boolean(errors.image)}
            readOnly
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    imageInputRef.current && imageInputRef.current.click();
                  }}
                  edge="end"
                >
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.image && touched.image && (
            <Typography marginY={0.5} color="#d32f2f" sx={{ fontSize: 12 }}>
              {errors.image}
            </Typography>
          )}
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Title</Typography>
          </InputLabel>
          <Select
            fullWidth
            placeholder="Select a title"
            value={selectedTitle}
            onBlur={handleBlur}
            name={'titleId'}
            onChange={(event) => handleTitleChange(event)}
            error={touched.titleId && Boolean(errors.titleId)}
            sx={{ borderRadius: 2, height: 40 }}
          >
            {titles.map((title) => (
              <MenuItem key={title.id} value={title.id}>
                {title.title}
              </MenuItem>
            ))}
          </Select>
          {errors.titleId && touched.titleId && (
            <Typography marginY={0.5} color="#d32f2f" sx={{ fontSize: 12 }}>
              {errors.titleId}
            </Typography>
          )}
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Status</Typography>
          </InputLabel>
          <Select
            fullWidth
            placeholder="Select a status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            name={'status'}
            error={touched.status && Boolean(errors.status)}
            sx={{ borderRadius: 2, height: 40 }}
          >
            {Object.values(EmployeeStatus).map((status: string) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {errors.status && touched.status && (
            <Typography marginY={0.5} color="#d32f2f" sx={{ fontSize: 12 }}>
              {errors.status}
            </Typography>
          )}
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Email</Typography>
          </InputLabel>
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={(event) => {
              handleBlur(event);
              checkIfEmailExists(event.target.value);
            }}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            size="small"
            variant="outlined"
            name={'email'}
            inputProps={{ maxLength: 35 }}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
          {!emailValid && (
            <Typography marginY={0.5} color="#d32f2f" sx={{ fontSize: 12 }}>
              Employee with this email already exists
            </Typography>
          )}
        </Grid>
        <Grid xs={6} mt={2}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Checkbox
              checked={values.isManager}
              onChange={(event) => {
                setFieldValue('isManager', event.target.checked);
                setFieldTouched('isManager');
              }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Manager</Typography>
          </Box>
        </Grid>
        <Grid xs={6}>
          <InputLabel>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Password</Typography>
          </InputLabel>
          <TextField
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            size="small"
            variant="outlined"
            name={'password'}
            inputProps={{ maxLength: 35 }}
            type={'password'}
            sx={{
              '& fieldset': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
      </Grid>
      {/* Cancel/save Buttons */}
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
        <Button sx={{ m: 1 }} variant="contained" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default EmployeeForm;
