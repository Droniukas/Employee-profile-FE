import { ListItemButton, ListItemText, Tooltip } from '@mui/material';

import { SkillLevel } from '../models/enums/SkillLevel';

type Props = {
  name: SkillLevel;
  onSelection: () => void;
  tooltipTitle: string;
};

function SkillLevelDropdownListItem({ name, onSelection, tooltipTitle }: Props) {
  return (
    <>
      <Tooltip title={tooltipTitle} disableInteractive>
        <ListItemButton sx={{ height: 1 }} onClick={onSelection}>
          <ListItemText primary={name} sx={{ marginTop: 0, marginBottom: 0 }} />
        </ListItemButton>
      </Tooltip>
    </>
  );
}

export default SkillLevelDropdownListItem;
