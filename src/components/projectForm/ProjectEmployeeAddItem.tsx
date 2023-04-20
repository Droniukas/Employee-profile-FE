import { Avatar, Box, Checkbox, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import Employee from '../../models/Employee.interface';

type ProjectEmployeeAddItemProps = {
  employee: Employee;
  selected: boolean;
  onStateChange: (selected: boolean) => void;
};

const ProjectEmployeeAddItem: React.FC<ProjectEmployeeAddItemProps> = (props: ProjectEmployeeAddItemProps) => {
  const { employee, selected, onStateChange } = props;

  return (
    <>
      <ListItem sx={{ padding: 0 }}>
        <Box display={'flex'} sx={{ alignItems: 'center' }}>
          <Checkbox
            sx={{ alignSelf: 'center', mr: 0.5 }}
            checked={selected}
            onChange={() => onStateChange(!selected)}
          />
          <ListItemAvatar>
            <Avatar
              src={`data:${employee.imageType};base64,${employee.imageBytes}`}
              sx={{
                border: '0.01px solid lightgrey',
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              employee.middleName
                ? `${employee.name} ${employee.middleName} ${employee.surname}`
                : `${employee.name} ${employee.surname}`
            }
            secondary={employee.title}
            sx={{
              color: '#000048',
            }}
          />
        </Box>
      </ListItem>
    </>
  );
};

export default ProjectEmployeeAddItem;
