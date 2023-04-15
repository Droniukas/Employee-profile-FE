import { ListItemButton, ListItemText, Tooltip } from '@mui/material';

import { AchievementLevel } from '../models/enums/AchievementLevel';

type Props = {
  name: AchievementLevel;
  onSelection: () => void;
  tooltipTitle: string;
};

const AchievementLevelDropdownListItem: React.FunctionComponent<Props> = (props: Props) => {
  const { name, onSelection, tooltipTitle } = props;
  return (
    <>
      <Tooltip title={tooltipTitle} disableInteractive>
        <ListItemButton sx={{ height: 1 }} onClick={onSelection}>
          <ListItemText primary={name} sx={{ marginTop: 0, marginBottom: 0 }} />
        </ListItemButton>
      </Tooltip>
    </>
  );
};

export default AchievementLevelDropdownListItem;
