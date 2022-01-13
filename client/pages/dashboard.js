import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { 
  Alert, 
  AlertIcon, 
  Box,
  Center,
  Text,
  Button,
  useColorModeValue, } from '@chakra-ui/react'
import axios from 'axios'

const Dashboard = () => {
  const router = useRouter()
  
  const [error, setError] = useState("")
  const [data, setData] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("authenticationToken")) {
      router.push('/login')
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authenticationToken")}`
        }
      }

      try {
        const { data } = await axios.get("/api/dashboard", config)
        setData(data.data)
      } catch (err) {
        console.log(err)
        localStorage.removeItem("authenticationToken")
        setError("You are not authorized to access this page")
      }
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authenticationToken")
    router.push('/login')
  }

  return (
    error ?
    <>
      <Alert rounded='10' mb={4} status='error'>
        <AlertIcon />
        { error }
      </Alert>
    </> :
    <>
      <Center py={6}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
            <Text textAlign={'center'}>
              { data }
            </Text>
            <Button
              onClick={handleLogout}
              mt={5}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}>
              Sign out
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  )
}

export default Dashboard
