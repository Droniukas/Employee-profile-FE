import { CheckCircleOutlineRounded } from '@mui/icons-material';
import { Alert, Snackbar, Stack } from '@mui/material';
import React from 'react';

type CustomSnackbarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

const CustomSnackbar = (props: CustomSnackbarProps) => {
  const { open, setOpen, message } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          icon={<CheckCircleOutlineRounded style={{ color: 'white' }} />}
          onClose={handleClose}
          sx={{
            fontSize: '14px',
            width: '400px',
            backgroundColor: '#32af61',
            color: 'white',
            '& .MuiAlert-message': { textAlign: 'left', width: 'inherit' },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomSnackbar;
