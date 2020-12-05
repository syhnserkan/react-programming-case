import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import moment from 'moment'

import { Link } from 'react-router-dom'

//redux stuff
import { useSelector, useDispatch } from 'react-redux'
import { checkLastViewedUser } from '../redux/Action'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  // const usersList = useSelector((state) => state.users)
  const storeUser = useSelector((state) =>
    state.users.length <= 5 ? state.users : state.users.slice(0, 5)
  )
  const [date, setDate] = useState('')

  const handleViewedUser = (id) => {
    const user = storeUser.find((person) => person.id === id)
    console.log(user)
    dispatch(checkLastViewedUser(user))
  }

  useEffect(() => {
    setInterval(() => {
      setDate(moment().format('DD/M/yyyy hh:mm:ss', true))
    }, 1000)
    return () => {
      clearInterval()
    }
  }, [])

  return (
    <Box>
      <Text w='80%' textAlign='right' m='0 auto'>
        <Badge borderRadius='5px'>{date}</Badge>
      </Text>
      <Flex
        w='80%'
        height='95vh'
        m='0 auto'
        justifyContent='space-between'
        alignItems='center'
      >
        {children}
        <Flex
          border='1px solid gray'
          borderRadius='5px'
          flexDirection='column'
          // justifyContent='space-between'
          alignItems='center'
          padding='15px 10px'
          height='580.8px'
          minW={['350px', '300px']}
          overflowY={storeUser.length > 5 ? 'scroll' : 'initial'}
        >
          <Heading as='h6' size='xs' mb='40px'>
            Latest Viewed Users
          </Heading>
          {/* Items component */}
          <Flex flexDirection='column' w='100%'>
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
                  marginBottom={index < storeUser.length - 1 ? '10px' : '0'}
                >
                  <Box w='70%'>
                    <Text fontSize='12px'>
                      {item.name.slice(0, 20) + '...'}
                    </Text>
                    <Text fontSize='12px'>
                      {item.email.slice(0, 20) + '...'}
                    </Text>
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
        </Flex>
      </Flex>
    </Box>
  )
}

export default Layout
