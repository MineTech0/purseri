import { styled } from '@nextui-org/react'
import React from 'react'
import { Plus } from 'react-iconly'

interface Props {
    onClick: () => void
}

const PlusButton = ({ onClick }: Props): JSX.Element => {
    const StyledDiv = styled('div', {
        cursor:'pointer',
        // filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
        '&:hover': {
            opacity:'80%'
          },
          '&:focus': {
            opacity:'80%'
          },
    })
  return (
    <StyledDiv onClick={onClick} >
      <Plus size="large" set="light" primaryColor="#333333" />
    </StyledDiv>
  )
}

export default PlusButton
