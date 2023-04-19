import { ListItemButton, ListItemText, Tooltip } from '@mui/material';

import { SkillLevel } from '../../enums/SkillLevel';

type SkillLevelDropdownListItemProps = {
  name: SkillLevel;
  onSelection: () => void;
  tooltipTitle: string;
};

const SkillLevelDropdownListItem: React.FunctionComponent<SkillLevelDropdownListItemProps> = (
  props: SkillLevelDropdownListItemProps,
) => {
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

export default SkillLevelDropdownListItem;
