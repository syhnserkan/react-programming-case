import React from 'react'
import { Spinner, Stack } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Stack
      w='100%'
      h='100%'
      direction='row'
      spacing={4}
      d='flex'
      justify='center'
      align='center'
    >
      <Spinner size='xl' />
    </Stack>
  )
}

export default Loading
