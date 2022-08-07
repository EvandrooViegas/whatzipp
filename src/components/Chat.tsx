import React, { useEffect, useState } from 'react'
import Rooms from './Rooms'
import {RoomType} from "../../interfaceTypes"
import { UserContext, useUserContext } from '../context/UserContext'
import { GrSend } from 'react-icons/gr'
import { useMessages } from '../hooks/useMessages'
import {MessagesType} from "../../interfaceTypes"
type IProps = {
  selectedRoom: RoomType
}

function Chat({selectedRoom}: IProps) {
  useEffect(() => {
    const getChatMessages = () => {
      console.log("hiii")
      console.log("hii")
      // const res = await useMessages("get")
      // // console.log(res)
      // // setMessages(res)
    }

    getChatMessages()
  }, [])

  // const handleSubmit = async (e:any) => {
  
  //   e.preventDefault()
  //   const newMessage = {title, by: user.email, to:selectedRoom.participant, roomId:selectedRoom.id}
  //   await useMessages("add", newMessage)
  // }

  // const {user, setUser} = useUserContext()
  // const [title, setTitle] = useState("")
  // const [messages, setMessages] = useState<any>()
  return (
    
    <div className='w-[100%] flex items-center justify-center mt-5'>
      {/* <div className='flex flex-col justify-between w-[90%] h-[97vh] bg-neutral-700 p-5 rounded-2xl'>

        <div>

            { 
    
                <div className='flex items-center justify-between mt-2 w-[100%] bg-neutral-800 p-2 rounded-lg shadow-lg cursor-pointer'>
                  <div>
                    {selectedRoom.participant === user.email ? 
                    
                      <img src={`https://avatars.dicebear.com/api/human/${selectedRoom.owner}.svg`} className="rounded-full" alt="" width={40}/>
                      : 
                      <img src={`https://avatars.dicebear.com/api/human/${selectedRoom.participant}.svg`} className="rounded-full" alt="" width={40}/>
                    }
                  </div>
                  <p>{selectedRoom.name}</p>

                </div>
                
              }
        </div>
            
  
        <form className='flex w-[100%] bg-neutral-800 p-4 rounded-2xl text-white' onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="flex-1 rounded-lg shadow-lg m-1 bg-neutral-700 pl-3 outline-none"/>
          <button className='flex-2 p-2 bg-green-700 m-1 rounded-lg shadow-lg ' onClick={handleSubmit}><GrSend /></button>
        </form>

         <div className='flex flex-col'>
                
            {messages?.map((msg:MessagesType) => {
              msg.by === user.email ? (
                <div className='p-2 bg-green-600 text-white'>
                  {msg.title}
                </div>  
              ) : (
                <div className='p-2 bg-neutral-500 text-white'>
                  {msg.title}
                </div> 
              )
            })}
        </div> 
      </div> */}
    </div>
  )
}

export default Chat