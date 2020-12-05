import React from 'react'
import { Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const LastViewed = ({ storeUser, handleViewedUser }) => {
  return (
    <Flex
      flexDirection='column'
      w='100%'
      height='100%'
      justifyContent='flex-start'
    >
      {storeUser.length > 0 ? (
        storeUser.map((item, index) => (
          <Flex
            key={item.id}
            border='1px solid gray'
            borderRadius='5px'
            padding='15px 10px'
            justifyContent='center'
            alignItems='center'
            w='100%'
            marginBottom={index < storeUser.length - 1 ? '16px' : '0'}
          >
            <Box w='70%'>
              <Text fontSize='12px'>{item.name.slice(0, 20) + '...'}</Text>
              <Text fontSize='12px'>{item.email.slice(0, 20) + '...'}</Text>
              <Text fontSize='12px'>{item.gender}</Text>
            </Box>
            <Link
              raised='true'
              primary='true'
              w='30px'
              size='xs'
              style={{
                textDecoration: 'none',
                backgroundColor: 'lightcyan',
                padding: '3px 5px',
                borderRadius: '5px',
                fontSize: '13px',
              }}
              onClick={() => handleViewedUser(item.id)}
              to={`/posts/${item.id}`}
            >
              View Posts
            </Link>
          </Flex>
        ))
      ) : (
        <Alert status='info'>
          <AlertIcon />
          There is no viewed user.
        </Alert>
      )}
    </Flex>
  )
}

export default LastViewed
