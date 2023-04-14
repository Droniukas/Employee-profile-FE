import Box from '@mui/material/Box';
import React from 'react';

type Props = {
  status: string;
};

const StatusChip: React.FC<Props> = (props: Props) => {
  const { status } = props;
  let color;

  switch (status) {
    case 'ACTIVE':
      color = '#1AAF55';
      break;
    case 'INACTIVE':
      color = '#FFDE00';
      break;
    case 'DISMISSED':
      color = '#999999';
      break;
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: '50%',
          width: 8,
          height: 8,
          marginRight: 0.5,
        }}
      />
      <span style={{ textTransform: 'capitalize' }}>{status.toLowerCase()}</span>
    </Box>
  );
};

export default StatusChip;
