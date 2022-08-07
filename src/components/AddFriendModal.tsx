import React, { Dispatch, SetStateAction, useState } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

type UserInfoProps = {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
}
function AddFriendModal({openModal, setOpenModal} :UserInfoProps) {

    const [email, setEmail] = useState("")
    const [roomName, setRoomName] = useState("")
    const [error, setError] = useState("")
    const {user} = useUserContext()

    const handleClick = async (e:any) => {
        e.preventDefault()

        if(roomName.length < 5) {
            setError("The room name might have more than 5 letters")
        } else {
            if(email) {
                if(email.includes("@")) {
                    try {
                        
                        const docRef = await addDoc(collection(db, "notification"), {
                          roomName,
                          by: user.email, 
                          to: email 
                        });
            
                        setEmail("")
                        setRoomName("")
                        console.log("Document written with ID: ", docRef.id);
                        setOpenModal(false)
                      } catch (e) {
                        console.error("Error adding document: ", e);
                      }
                } else {
                    setError("You must write a valid email")
                }
            } else {
                setError("You must write a email")
            }
        }


    }
  return (
    <div id='friendModal' className='flex justify-center relative items-center'>

        <button 
        className='absolute right-20 top-4 p-2 hover:bg-neutral-800 rounded  '
        onClick={() => setOpenModal(false)}>
            <IoClose />
        </button>
        <div className='w-fit h-fit bg-neutral-900 rounded-lg shadow-lg' id="friendInnerModal">
            {error &&
                <div className='bg-red-500 p-2 mt-5 text-center rounded shadow text-white w-[95%] m-auto'>
                    {error}
                </div>
            }
            <div className='m-10'>
                <h3 className='font-bold capitalize text-center text-2xl'>Add a new friend</h3>

                <form className='flex flex-col justify-center items-center mt-10'>

                    <span className='text-stone-400 mt-10'>Room Name: </span><br />
                    <input value={roomName} onChange={(e) => setRoomName(e.target.value)} type="text" className='w-[90%] bg-neutral-800 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder='How do you want call this room?'/>
                    
                    <span className='text-stone-400 mt-10'>Email: </span><br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='w-[90%] bg-neutral-800 p-3 rounded-lg outline-none hover:border-[1px] border-green-500 bg-zinc-00 transition cursor-pointer placeholder-gray-500 placeholder-opacity-30' placeholder="Your friends's email... "/>
                    <br />
                    <button className="bg-green-500 w-fit text-black mt-10 p-5 rounded shadow hover:bg-green-600" onClick={handleClick}>
                        <HiArrowNarrowRight />
                    </button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default AddFriendModal