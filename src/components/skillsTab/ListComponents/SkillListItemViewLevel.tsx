import { ThemeProvider, Tooltip, Typography } from '@mui/material';
import Theme from '../../../data/Theme';
import { SkillLevel } from '../models/enums/SkillLevel';

type Props = {
  primaryText: SkillLevel | null;
  tooltipText: string;
};

function SkillListItemLevel({ primaryText, tooltipText }: Props) {
  return (
    <ThemeProvider theme={Theme}>
      <Tooltip title={tooltipText} disableInteractive>
        <Typography
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
          {primaryText}
        </Typography>
      </Tooltip>
    </ThemeProvider>
  );
}

export default SkillListItemLevel;
