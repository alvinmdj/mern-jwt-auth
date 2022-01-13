import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'

const ResetToken = () => {
  const router = useRouter()
  const { resetToken } = router.query

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
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
      const { data } = await axios.put(
        `/api/auth/resetpassword/${resetToken}`, 
        { password }, 
        config
      )
      console.log(data)
      setSuccess(data.data)
      
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
      <Stack
        as='form'
        onSubmit={handleResetPassword}
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>

        {error && <Alert rounded='10' mb={4} status='error'>
          <AlertIcon />
          { error }
        </Alert>}

        {success && <Alert rounded='10' mb={4} status='success'>
          <AlertIcon />
          <Box>
            { success }
            <NextLink href='/login'>
              <Link color={'blue.400'}>Login</Link>
            </NextLink>
          </Box>
        </Alert>}

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

        <Stack spacing={6}>
          <Button
            type='submit'
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default ResetToken