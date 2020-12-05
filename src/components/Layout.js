import React, { useEffect, useState } from 'react'
import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import moment from 'moment'
//redux stuff
import { useSelector, useDispatch } from 'react-redux'
import { checkLastViewedUser } from '../redux/Action'

//componenets
import LastViewed from './LastViewed'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const storeUser = useSelector((state) =>
    state.users.length <= 5 ? state.users : state.users.slice(0, 5)
  )
  const [date, setDate] = useState('')

  const handleViewedUser = (id) => {
    const user = storeUser.find((person) => person.id === id)
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
          <LastViewed
            storeUser={storeUser}
            handleViewedUser={(id) => handleViewedUser(id)}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Layout
