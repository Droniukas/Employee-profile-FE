import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

type ConfirmationDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = (props) => {
  const { open, onCancel, onConfirm } = props;
  return (
    <Dialog open={open} maxWidth="xl">
      <DialogTitle>Confirm exit</DialogTitle>
      <DialogContent>
        <Typography>Changes will be lost, are you sure you want to leave?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={onConfirm} sx={{ m: 1 }} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
