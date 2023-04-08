import { Button } from '@mui/material'

export enum StyleVariants {
  CONTAINED = 'contained',
  GREY = 'greyBtn',
}

type Props = {
  text: string
  styleVariant: StyleVariants
  handleClick: () => void
}

function viewButton({ text, styleVariant, handleClick }: Props) {
  return (
    <Button variant={styleVariant} onClick={handleClick}>
      {text}
    </Button>
  )
}

export default viewButton
