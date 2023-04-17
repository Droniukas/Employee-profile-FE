import { Box, ThemeProvider, Tooltip } from '@mui/material';

import theme from '../../../config/theme';
import { SkillLevel } from '../../enums/SkillLevel';

type Props = {
  name: SkillLevel | null;
  tooltipText: string;
};

const SkillLevelWithTooltip: React.FunctionComponent<Props> = (props: Props) => {
  const { name, tooltipText } = props;
  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={tooltipText} disableInteractive>
        <Box
          sx={{
            color: '#666666',
            float: 'right',
            marginRight: 10,
            borderRadius: 10,
            paddingTop: 0.2,
            paddingBottom: 0.2,
            paddingRight: 0.5,
            paddingLeft: 0.5,
            cursor: 'default',
            ':hover': { backgroundColor: '#DDDDDD' },
            transition: 'background-color 0.2s',
          }}
        >
          {name}
        </Box>
      </Tooltip>
    </ThemeProvider>
  );
};

export default SkillLevelWithTooltip;
