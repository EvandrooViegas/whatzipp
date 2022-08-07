import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import {useState, useEffect, useContext} from "react"
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {auth} from "../firebase/config"
function Login() {
    const {setUser, user} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleClick = async (e:any) => {
      e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, email, password)
        .then()
        .catch((error: any) => {
            error.message.includes("user-not-found") ? setError("User not found") : setError("A error ocurred try later")
            error.message.includes("password") ? setError("Wrong Password or email") : setError("A error ocurred try later")
        })
      } catch (error: any) {
        setError(error.message)
      }
    }
  return (
    <div className='flex flex-col justify-center items-center content-center '>
        {error &&
            <div className='bg-red-500 p-2 m-3 rounded shadow text-white'>
                {error}
            </div>
        }
        <form onSubmit={handleClick}>
            <div className='h-[80vh] flex flex-col bg-neutral-800 text-white p-10 mt-16 rounded-lg px-20 justify-evenly '>
                <h2 className='font-semibold text-center text-3xl'>Login</h2>
                <div className='flex flex-col gap-3'>

                    <span className='text-stone-400'>Email: </span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='bg-neutral-900 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='Your email... '/>

                    <span className='text-stone-400'>Password: </span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='bg-neutral-900 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='And your password...'/>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <button className="bg-green-500 w-fit text-black mt-10 p-5 rounded shadow hover:bg-green-600" onClick={handleClick}>
                        <HiArrowNarrowRight />
                    </button>
                    <p className='text-stone-400 text-sm mt-4'>Already have an Account? <Link to="/register" className='text-green-600'>Register</Link> </p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login