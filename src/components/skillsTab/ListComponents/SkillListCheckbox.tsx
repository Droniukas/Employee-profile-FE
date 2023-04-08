import { Checkbox } from '@mui/material'

type Props = {
  isDisabled: boolean
  isChecked: boolean | null
  onChange: () => void
}

function SkillCheckbox({ isDisabled, isChecked, onChange }: Props) {
  if (isChecked === null) throw new Error('Value is null')
  return (
    <>
      <Checkbox
        disabled={isDisabled}
        onChange={() => {
          onChange()
        }}
        checked={isChecked}
      />
    </>
  )
}

export default SkillCheckbox
