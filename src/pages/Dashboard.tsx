import { signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { RoomType } from '../../interfaceTypes'
import BlankChat from '../components/BlankChat'
import Chat from '../components/Chat'
import Room from '../components/Room'
import Sidebar from '../components/Sidebar'
import { useSelectedRoomContext } from '../context/SelectedRoomContext'
import { UserContext } from "../context/UserContext"
import { auth } from '../firebase/config'

function Dashboard() {

  const {user, setUser} = useContext(UserContext)
  const {selectedRoom, setSelectedRoom} = useSelectedRoomContext()
  const [isOpen, setIsOpen] = useState(true)
  const logout = async () => {
    await signOut(auth)
  
  }


  return (
    <div className='flex justify-center'> 

      <button onClick={() => setIsOpen(!isOpen)} className="text-white m-4 text-xl hover:text-green-600">
        {isOpen ?
          <HiArrowNarrowLeft /> :
          <HiArrowNarrowRight />
        }
      </button>
      <div className={`flex flex-col justify-between ${isOpen ? "w-[20%]" : "w-[0%]"} bg-neutral-800 h-[100vh] ${isOpen ? "w-fit translate-x-1 opacity-1" : "w-1 translate-x-full opacity-0"} ease-in duration-300`}>
        {isOpen &&
          <Sidebar isOpen={isOpen} />
        }
      </div>
      
      <div className={`flex justify-center items-start ml-4 ${isOpen ? "w-[80%]" : "w-[100%]"}`}>
        <Room />
        {/* {
          selectedRoom ?
          <BlankChat /> :
          <Room/> 
        } */}
      </div>

      
    </div>
  )
}

export default Dashboard