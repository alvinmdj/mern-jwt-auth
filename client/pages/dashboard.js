import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Alert, AlertIcon, Button } from '@chakra-ui/react'
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
          Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`
        }
      }

      try {
        const { data } = await axios.get("/api/dashboard", config)
        setData(data.data)
      } catch (err) {
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
        There was an error processing your request
      </Alert>
    </> :
    <>
      <div>{ data }</div>
      <Button 
        colorScheme='blue'
        onClick={handleLogout}>
        Sign out
      </Button>
    </>
  )
}

export default Dashboard
