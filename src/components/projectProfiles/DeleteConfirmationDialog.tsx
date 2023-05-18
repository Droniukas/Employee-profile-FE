import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';

import Project from '../../models/Project.interface';

type DeleteConfirmationDialogProps = {
  project: Project;
  onClose: () => void;
  onDelete: (id: number) => void;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = (props: DeleteConfirmationDialogProps) => {
  const { project, onClose, onDelete } = props;

  const handleDeleteClick = () => {
    if (project.id) onDelete(project.id);
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
        <Button onClick={handleCancelClick} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDeleteClick} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
