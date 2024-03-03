'use client'
import '../../globals.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function Login() {
  const router = useRouter()
  const [shake, setShake] = React.useState(false)
  const [details, setDetails] = React.useState<{username: string, password: string}>({username: '', password: ''})
  const handleInputChange = (value: string, type: 'username' | 'password') => {
    switch(type) {
      case 'username':
        setDetails({
          ...details,
          username: value
        })
        break
      case 'password':
        setDetails({
          ...details,
          password: value
        })
        break
    }
  }
  const handleLogin = async () => {
    const responseData =(await axios.get(`http://prices.grabyourservices.com:8080/api/admin/get?username=${details.username}&password=${details.password}`)).data
    if(responseData.code == 200) {
      localStorage.setItem('token', responseData.token)
      router.push('/admin')
    } else {
      setShake(true)
      await sleep(500)
      setShake(false)
    }
    console.log(responseData)
  }
  return (
    <div className={`bg-primary min-h-screen py-24 flex justify-center items-center`}>
        <div className={`bg-secondary text-primary rounded-lg p-8 ${shake ? 'animate-shake' : ''}`}>
            <h1 className='flex justify-center items-center font-roboto-bold text-2xl'>Login</h1>
            <h1 className='flex justify-center items-center font-roboto-normal mt-2 text-lg'>Please login with your details below</h1>
            <div className='flex justify-center flex-col items-center w-full mt-4'>
                <input onChange={(e)=>{handleInputChange(e.target.value, 'username')}} className='bg-primary p-2 placeholder-secondary w-full text-secondary rounded-xl font-roboto-bold transition duration-500 hover:cursor-pointer hover:scale-105 active:scale-90 focus:outline-none focus:scale-110 focus:cursor-text focus:font-roboto-normal' placeholder='Username'></input>
                <input onChange={(e)=>{handleInputChange(e.target.value, 'password')}} type='password' className='mt-2 bg-primary p-2 placeholder-secondary w-full text-secondary rounded-xl font-roboto-bold transition duration-500 hover:cursor-pointer hover:scale-105 active:scale-90 focus:outline-none focus:scale-110 focus:cursor-text focus:font-roboto-normal' placeholder='Password'></input>
            </div>
            <button onClick={handleLogin} className='mt-4 bg-primary rounded-xl transition duration-500 text-secondary hover:text-primary hover:scale-110 hover:bg-transparent font-roboto-bold w-full p-3'>Log in</button>
        </div>
    </div>
  )
}

export default Login