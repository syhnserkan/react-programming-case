import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Heading, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import Post from '../components/Post'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

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
    fetchPosts()
  }, [id])
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
        Selected User Name {id}
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
