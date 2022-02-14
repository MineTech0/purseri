import { Card, Text } from '@nextui-org/react'
import React from 'react'
import { FormResult } from '../../types/types'

interface Props {
  result: FormResult
}

const ResultBanner = ({ result: { type, message } }: Props): JSX.Element => {
  return (
    <Card css={{ w: '100%' }} color={type}>
      <Text css={{ fontWeight: '$bold', color: '$white' }} span>
        {message}
      </Text>
    </Card>
  )
}

export default ResultBanner
