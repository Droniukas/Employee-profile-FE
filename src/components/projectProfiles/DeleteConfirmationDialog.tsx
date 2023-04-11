import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';

import ProjectsResult from '../../models/ProjectProfilesResult.interface';

type DeleteConfirmationDialogProps = {
  project: ProjectsResult;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ project, onClose, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(project.id);
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <Dialog open={true} maxWidth="xl">
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure project{' '}
          <Typography component="span" fontWeight="bold">
            {project.title}
          </Typography>{' '}
          should be deleted?
        </Typography>
        <Typography>Deletion cannot be reverted.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button onClick={handleDeleteClick} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
