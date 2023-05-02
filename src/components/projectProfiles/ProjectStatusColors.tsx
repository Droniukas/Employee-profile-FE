import Box from '@mui/material/Box';

import { ProjectStatus } from '../enums/ProjectStatus';

export const statusColors = (projectStatus: string) => {
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
