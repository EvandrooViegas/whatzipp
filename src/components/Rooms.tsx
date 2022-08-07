import { collection, deleteDoc, doc } from 'firebase/firestore'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IoNotifications } from 'react-icons/io5'
import { TiUserAdd } from 'react-icons/ti'
import { RoomType } from '../../interfaceTypes'
import { useSelectedRoomContext} from '../context/SelectedRoomContext'
import { useUserContext } from '../context/UserContext'
import { db } from '../firebase/config'
import useRooms from '../hooks/useRooms'
type UserInfoProps = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>

}
function Rooms({openModal, setOpenModal}: UserInfoProps) {
  const {user, setUser} = useUserContext()
  const [rooms, setRooms] = useState<any>()
  const {selectedRoom, setSelectedRoom} = useSelectedRoomContext()
  useEffect(() => {
      useRooms("", "get", null, null, null, user).then(res => 
        setRooms(res)
      )
  }, [])

  function handleClick(room:any) {
    // console.log(room)
    setSelectedRoom(room)
    // console.log(selectedRoom)
  }


  return (
    <div className='flex justify-center items-center text-center m-4 p-2 bg-neutral-700 rounded-lg shadow-lg h-[70%]'>
      {rooms?.length <= 0 ?(
        <div className='flex flex-col'>
          <p>No rooms yet.</p>
          <button 
          className='flex items-center gap-3 p-2 text-black bg-green-600 rounded-lg shadow-lg mt-2 hover:bg-neutral-800 text-white' 
          onClick={() => setOpenModal(true)}
          >Add here <TiUserAdd /></button>
        </div>) : (

          <div className='flex flex-col w-[95%]'>
            {
              rooms?.map((room:any) => (
                <div key={room.id} className='flex items-center justify-between mt-2 w-[100%] bg-neutral-800 p-2 rounded-lg shadow-lg cursor-pointer hover:bg-neutral-600' onClick={() => handleClick(room)}>
                  <div>
                    {room.participant === user.email ? 
                    
                      <img src={`https://avatars.dicebear.com/api/human/${room.owner}.svg`} className="rounded-full" alt="" width={40}/>
                      : 
                      <img src={`https://avatars.dicebear.com/api/human/${room.participant}.svg`} className="rounded-full" alt="" width={40}/>
                    }
                  </div>
                  <p>{room.name}</p>
                 
                </div>
              ))
            }
          </div>
        )
      } 
    </div>
  )
}

export default Rooms