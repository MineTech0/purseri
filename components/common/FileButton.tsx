import { styled } from '@nextui-org/react'
import { PaperDownload } from 'react-iconly';

interface Props {
    onClick: () => void
}

const FileButton = ({ onClick }: Props): JSX.Element => {
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
        <PaperDownload size="large" set="light" primaryColor="#333333"/>
    </StyledDiv>
  )
}

export default FileButton
