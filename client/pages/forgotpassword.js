import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      )
      setSuccess(data.data)

    } catch (err) {
      setError(error.response.data.error)
      setEmail("")
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
        onSubmit={handleForgotPassword}
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>

        {error && <Alert rounded='10' mb={4} status='error'>
          <AlertIcon />
          { error }
        </Alert>}

        {success && <Alert rounded='10' mb={4} status='success'>
          <AlertIcon />
          { success }
        </Alert>}

        <FormControl>
          <Input
            type="email"
            id="email"
            value={ email }
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            required
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            type='submit'
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default ForgotPassword