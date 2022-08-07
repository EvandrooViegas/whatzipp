import React, { useEffect, useRef, useState } from 'react'
import Rooms from './Rooms'
import {RoomType} from "../../interfaceTypes"
import { UserContext, useUserContext } from '../context/UserContext'
import { GrSend } from 'react-icons/gr'

import {MessagesType} from "../../interfaceTypes"
import { useSelectedRoomContext } from '../context/SelectedRoomContext'
import useMessages from '../hooks/useMessages'
import { collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../firebase/config'


function Room() {
  const {user, setUser} = useUserContext()
  const [title, setTitle] = useState("")
  const [messages, setMessages] = useState<any>()
  const {selectedRoom, setSelectedRoom} = useSelectedRoomContext()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)
  let userMessages = []
  let isSent = false



  
  useEffect(() => {
    if(messages) {
      isSent = true
    }
  }, [messages])

  useEffect(() => {
    setTimeout(() => {
      setError("")
    }, 2000)
  }, [error])


      
    if(selectedRoom) {

      const messageCollectionRef = collection(db, "message")
      const q = query(messageCollectionRef, where("roomId", "==", selectedRoom.id), orderBy("timestamp", "asc"))
      
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
      })
      
    }
    
    messageRef.current?.scrollIntoView({behavior: "smooth"})

    const deleteMessage = async (message:MessagesType) => {
      if(message.by === user.email) {
        
        useMessages("delete", message, "").catch(err => {
        console.log(err)
      })
    } 

  }
  
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    if(isSent === true) {
      if(title) {
        const newMessage = {
          title, by: user.email,
          roomId:selectedRoom.id,
          to: user.email === selectedRoom.participant ? selectedRoom.owner : selectedRoom.participant,
          timestamp: serverTimestamp()
        }
        setTitle("")
        setMessages([...messages, newMessage])
        await useMessages("add", newMessage, user)
      } else {
        setError("The message should have a text")
      }

    } else {
      setError("Wait the message is been sent")
    }

     
  }
  

  return (
    
    <div className='w-[100%] flex items-center justify-center mt-5'>
      {selectedRoom ?

          <div className='flex flex-col justify-between w-[90%] h-[97vh] bg-neutral-700 p-5 rounded-2xl'>
            {error &&
                <div className='bg-red-500 p-2 mt-5 rounded shadow text-white w-fit m-auto'>
                    {error}
                </div>
            }
     

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
                
      
            {messages &&
              <div className='flex flex-col overflow-scroll overflow-x-hidden h-[85%] mt-1'>
                  {messages.map((message:MessagesType) => {
                   
                     {
                      if(message.by === user.email) {
                
                        return (
                          <div className='bg-green-600 flex-start p-2 h-fit rounded-lg mt-1 break-words cursor-pointer' onDoubleClick={() => deleteMessage(message)}>
                            {message.title}
                          </div>
                        )
                      } else {
                    
                        return (

                        <div className='bg-neutral-600 flex-start p-2 h-fit rounded-lg mt-1 break-words'>
                            {message.title}
                        </div>
                        )
                      }
                    }
                    
                  })}
              </div>
            }
            <div ref={messageRef}></div>
           

            <form className='flex w-[100%] bg-neutral-800 p-4 rounded-2xl text-white' onSubmit={handleSubmit}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="flex-1 rounded-lg shadow-lg m-1 bg-neutral-700 pl-3 outline-none"/>
              <button className='flex-2 p-2 bg-green-700 m-1 rounded-lg shadow-lg ' onClick={handleSubmit}><GrSend /></button>
            </form>

          </div>
  
        
        :

        <div>
          No rooms selected
        </div>
      }
    </div>
  )
}

export default Room