
import React, { Dispatch, SetStateAction, useEffect, useState, useLayoutEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore"; 
import { db } from '../firebase/config';
import {GrFormClose} from "react-icons/gr"
import {BsCheck} from "react-icons/bs"
import useRooms from '../hooks/useRooms';
import { useUserContext } from '../context/UserContext';
import useNotifications from '../hooks/useNotifiactions';
import useNotification from '../hooks/useNotifiactions';
type UserInfoProps = {
    setOpenNotificationModal: Dispatch<SetStateAction<boolean>>
    openNotificationModal: boolean
    openModal: boolean 
    setOpenModal: Dispatch<SetStateAction<boolean>>
}
function NotificationModal({openModal, setOpenModal, openNotificationModal, setOpenNotificationModal} : UserInfoProps) {
    const [error, setError] = useState("")
    const [notifications, setNotifications] = useState<any>(null)
    const {user, setUser} = useUserContext()
    useLayoutEffect(() => {
        const getNotifications = async () => {
            let notifications = await useNotifications("get", "", user)
            console.log("renderizou")
            setNotifications(notifications)
            console.log(notifications)
        }

        getNotifications()
    }, [])


    const removeNotification = async (id:string) => {
        await useNotifications("delete", id)
        const tempList = notifications.filter((notif:any) => {notif.id === id})
        setNotifications(tempList) 
        console.log("remove")
        setOpenNotificationModal(false)
       
    }

    const acceptNotification = async (notification:any, owner:any, participant:any) => {
        console.log(participant)
        setOpenNotificationModal(false)
        const res = await useRooms(notification.id, "add", notification, user, participant)
        await useNotifications("delete", notification.id)
        

    }
  return (
    <div id='notificationModal' className='flex justify-center relative items-center'>

        <button 
        className='absolute right-20 top-4 p-2 hover:bg-neutral-800 rounded  '
        onClick={() => setOpenNotificationModal(false)}>
            <IoClose />
        </button>

        <div className='w-[80%] h-fit bg-neutral-900 rounded-lg shadow-lg' id="notificationInnerModal">
            {error &&
                <div className='bg-red-500 p-2 mt-5 rounded shadow text-white w-fit m-auto'>
                    {error}
                </div>
            }
            <div className='m-10'>
                <h3 className='font-bold capitalize text-center text-2xl'>Notifications</h3>

                <div>
                    {notifications?.length > 0 ? 
                        (
                            notifications?.map((notification:any) => (
                    
                                <div className='flex flex-wrap justify-between items-center m-4 p-2 bg-neutral-700 rounded-lg shadow-lg h-[70%]'>
                                    <div>
                                        <p className='font-semibold'>Room Name: {notification.roomName}</p>
                                        <p className='text-neutral-400'>by: {notification.by}</p>
                                    </div>
                                    <div className='flex flex-wrap gap-3 mt-2'>
                                        <button className='p-2 bg-red-600 rounded shadow' onClick={() => removeNotification(notification.id)}><GrFormClose/></button>
                                        <button className='p-2 bg-green-600 text-black rounded shadow' onClick={() => acceptNotification(notification, user, notification.to)}><BsCheck /></button>
                                    </div>
                                </div>
                                
                           ))
                        ) : (
                            <div className='text-center mt-5'>
                                No Notifications 😪
                            </div>
                        )
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default NotificationModal