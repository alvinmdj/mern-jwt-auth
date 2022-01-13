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
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("")

  useEffect(() => {
    if(localStorage.getItem("authenticationToken")) {
      router.push('/dashboard')
    }
  }, [router])

  const handleRegister = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    if (password !== confirmPassword) {
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        setError("")
      }, 5000)
      return setError("Password do not match")
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register", 
        { username, email, password }, 
        config
      )
      localStorage.setItem("authenticationToken", data.token)
      router.push('/dashboard')

    } catch (err) {
      setError(err.response.data.error)
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up now, it's FREE
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
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

          <Stack as='form' spacing={4} onSubmit={handleRegister}>
            <FormControl  isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                type="text" 
                id="username" 
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" 
                required />
            </FormControl>

            <FormControl isRequired>
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

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmpassword"
                  value={ confirmPassword }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  required />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                    }>
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack>
              <Text align={'center'}>
                Already have an account? 
                {' '}
                <NextLink href='/login'>
                  <Link color={'blue.400'}>Login</Link>
                </NextLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register