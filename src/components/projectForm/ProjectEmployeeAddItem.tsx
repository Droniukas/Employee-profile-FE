import { Avatar, Box, Checkbox, Link, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

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
            secondary={employee.title}
            sx={{
              color: 'primary.main',
            }}
          >
            <Link
              href={
                employee.id.toString() !== `${process.env.REACT_APP_TEMP_USER_ID}`
                  ? `http://localhost:3000/skills?employeeId=${employee.id}`
                  : 'http://localhost:3000/skills?filter=my'
              }
              underline="hover"
              target="_blank"
            >
              {employee.middleName
                ? `${employee.name} ${employee.middleName} ${employee.surname}`
                : `${employee.name} ${employee.surname}`}
            </Link>
          </ListItemText>
        </Box>
      </ListItem>
    </>
  );
};

export default ProjectEmployeeAddItem;
