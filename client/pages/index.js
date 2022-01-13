import {
  Box,
  Center,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Next - Express - JWT Authentication</title>
        <meta name="description" content="Secure and advanced authentication with JWT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              This is a fully-functioning JWT authentication application for Next.js
            </Text>
            <Button
              onClick={() => router.push('/login')}
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
              Demo Application
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  )
}