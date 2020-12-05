import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import moment from 'moment'

const Post = ({ title, body, created_at }) => {
  return (
    <Flex
      w='100%'
      flexDirection='column'
      border='1px solid gray'
      padding='10px 15px'
      borderRadius='5px'
      fontSize={['12px', '13px', '14px', '15px']}
      lineHeight={['1.1', '1.2', '1.3', '1.4']}
    >
      <Box w='100%' mb='10px'>
        <Text w='max-content' float='right'>
          {moment(created_at).format('DD/M/yyyy hh:mm')}
        </Text>
      </Box>
      <Heading as='h4' size='xs' mb='10px'>
        {title.slice(0, 30) + '...'}
      </Heading>
      <Text>{body.slice(0, 200) + '...'}</Text>
    </Flex>
  )
}

export default Post
