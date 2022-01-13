import { 
  Alert,
  AlertIcon,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("")

  useEffect(() => {
    if(localStorage.getItem("authenticationToken")) {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const { data } = await axios.post(
        "/api/auth/login", 
        { email, password }, 
        config
      )
      localStorage.setItem("authenticationToken", data.token)
      router.push('/dashboard')

    } catch (err) {
      setError(err.response.data.error)
      setEmail("")
      setPassword("")
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          
          {error && <Alert rounded='10' mb={4} status='error'>
            <AlertIcon />
            { error }
          </Alert>}

          <Stack as='form' spacing={4} onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                id="email" 
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address" 
                required />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={ password }
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={5}>
              <Stack direction={{ base: 'column', sm: 'row' }}>
                <NextLink href='/forgotpassword'>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </NextLink>
              </Stack>
              <Button
                type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Stack>
                <Text align={'center'}>
                  Do not have an account? 
                  {' '}
                  <NextLink href='/register'>
                    <Link color={'blue.400'}>Register</Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login