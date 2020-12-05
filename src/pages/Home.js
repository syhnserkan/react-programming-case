import React, { useEffect, useState } from 'react'
import { Flex, Input, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import Datatable from 'react-data-table-component'
//components
import Loading from '../components/Loading'

//redux
import { useDispatch } from 'react-redux'
import { checkLastViewedUser } from '../redux/Action'
import { Link } from 'react-router-dom'

const Home = () => {
  //for pagination
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [inputVal, setInputVal] = useState('')

  const dispatch = useDispatch() //instead of mapDispatchTheProps

  const fetchData = async (page) => {
    await axios(`https://gorest.co.in/public-api/users?&page=${page}`)
      .then((res) => {
        const { data } = res.data
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  const filterUser = (users) => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().indexOf(inputVal.toLocaleLowerCase()) > -1
    )
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const handleViewedUser = (id) => {
    const user = users.find((person) => person.id === id)
    dispatch(checkLastViewedUser(user))
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
    {
      cell: (row) => (
        <Link
          raised='true'
          primary='true'
          size='xs'
          style={{
            textDecoration: 'none',
            backgroundColor: 'lightcyan',
            padding: '3px 5px',
            borderRadius: '5px',
          }}
          onClick={() => handleViewedUser(row.id)}
          id={row.id}
          to={`posts/${row.id}`}
        >
          View Posts
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  return (
    <Flex
      flexDirection='column'
      h='580.8px'
      w='100%'
      padding='15px 20px'
      marginRight='20px'
      border={loading ? '0' : '1px solid gray'}
      borderRadius='5px'
    >
      {loading ? (
        <Loading />
      ) : users.length > 0 ? (
        <>
          <Stack spacing={3} w='100%'>
            <Input
              w='40%'
              placeholder='Filter by name'
              size='md'
              marginLeft='auto'
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </Stack>
          <Datatable
            title='Users List'
            columns={columns}
            data={filterUser(users)}
            pagination
            highlightOnHover
            responsive
            paginationServer
            paginationRowsPerPageOptions={[20, 25, 30]}
            onChangePage={handlePageChange}
            style={{ overflowY: 'scroll', height: '100%' }}
          />
        </>
      ) : (
        <Text>{error}</Text>
      )}
    </Flex>
  )
}

export default Home
