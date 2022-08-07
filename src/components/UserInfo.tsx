import { signOut } from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import { MdLogout } from 'react-icons/md'
import { useUserContext } from '../context/UserContext'
import { auth } from '../firebase/config'


function UserInfo() {
    const {user, setUser} = useUserContext()
    
    const logout = async () => {
        await signOut(auth)
    }
    return (
    <div className='flex flex-wrap justify-between items-center m-4 p-2 bg-neutral-700 rounded-lg shadow-lg'>
            <div className='bg-neutral-600 p-1 rounded-full'>
                <img src={`https://avatars.dicebear.com/api/human/${user.email}.svg`} alt="" width={40}/>
            </div>
            <div className='mx-4'>
                <p>{user.username}</p>
            </div>
            <div>
                <button className='text-red-600 text-lg p-2 hover:bg-neutral-600 rounded-full shadow-lg' onClick={logout}> <MdLogout /> </button>
            </div>
        </div> 
  )
}

export default UserInfo