import React, { useState, useEffect, useContext } from 'react'
import {HiArrowNarrowRight} from "react-icons/hi"
import { Link } from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { UserContext } from "../context/UserContext"
import {auth} from "../firebase/config"
import { onAuthStateChanged } from 'firebase/auth'
function Register() {   
    const {setUser, user} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    let uid : string

    const handleClick = async (e:any) => {
        e.preventDefault()
        if(password.length < 6) {
            setError("Your password should have more than 6 charters!")
        } else {
            try {
                
                if(email && password && name) {
                
                    setError("") 
                    await createUserWithEmailAndPassword(auth, email, password)
                    .then((UserCredential) => {
                        UserCredential.user.getIdToken().then(res => {
                            console.log(res)
               
                        })
                        uid = UserCredential.user.uid
                    })
                    .catch((error:any) => {
                        error.message.includes("auth/email-already-in-use") ? setError("Email already in use") : setError("A error ocurred try later")
                    })

                } else {
                    setError("Please fill all inputs!")
                }
            } catch (error:any) {
                error.message.includes("auth/email-already-in-use") ? setError("Email already in use") : setError("A error ocurred try later")
            }
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
                <h2 className='font-semibold text-center text-3xl'>Register</h2>
                <div className='flex flex-col gap-3'>
                    <span className='text-stone-400 text-left'>Name: </span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='bg-neutral-900 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='Write your name...'/>

                    <span className='text-stone-400'>Email: </span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='bg-neutral-900 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='Your email... '/>

                    <span className='text-stone-400'>Password: </span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='bg-neutral-900 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='And your password...'/>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <button className="bg-green-500 w-fit text-black mt-10 p-5 rounded shadow hover:bg-green-600" onClick={handleClick}>
                        <HiArrowNarrowRight />
                    </button>
                    <p className='text-stone-400 text-sm mt-4'>Dont have an Account? <Link to="/login" className='text-green-600'>Login</Link> </p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Register