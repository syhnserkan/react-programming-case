import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Alert, AlertIcon, Box, Heading, Stack } from '@chakra-ui/react'
//components
import Loading from '../components/Loading'
import Post from '../components/Post'

//redux stuff
import { useSelector } from 'react-redux'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const { id } = useParams()

  //store users
  const storeUsers = useSelector((state) => state.users)

  useEffect(() => {
    const fetchPosts = async () => {
      await axios(`https://gorest.co.in/public-api/users/${id}/posts`)
        .then((res) => {
          const { data } = res.data
          setPosts(data)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }
    const findUsername = () => {
      const users = storeUsers.filter((user) => user.id !== id)
      setUsername(users[0].name)
    }

    fetchPosts()
    findUsername()
  }, [storeUsers, id])

  return (
    <Box
      d='flex'
      flexDirection='column'
      justifyContent='flex-start'
      minH='580.8px'
      padding='15px 20px'
      marginRight='20px'
    >
      <Heading as='h4' size='md' mb='20px'>
        {username}
      </Heading>
      <Box
        d='grid'
        gridTemplateColumns={[
          'repeat(1,minmax(0,1fr))',
          'repeat(2,minmax(0,1fr))',
          'repeat(2,minmax(0,1fr))',
          'repeat(3,minmax(0,1fr))',
        ]}
        gridGap='20px'
      >
        {loading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <Stack spacing={3}>
            <Alert status='error'>
              <AlertIcon />
              {error.length > 0 ? error : 'Post has not been found.'}
            </Alert>
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default Posts
