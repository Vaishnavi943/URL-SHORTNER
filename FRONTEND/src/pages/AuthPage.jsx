import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'

const AuthPage = () => {

    const [login, setLogin] = useState(true)


  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
          {login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}  
        </div>
      </div>
    </>
  )
}

export default AuthPage