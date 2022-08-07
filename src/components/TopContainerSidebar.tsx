import { collection, getDocs } from 'firebase/firestore'
import React, { Dispatch, SetStateAction, useEffect, useState, useLayoutEffect } from 'react'
import {IoNotifications} from "react-icons/io5"
import {TiUserAdd} from "react-icons/ti"
import { useUserContext } from '../context/UserContext'
import { db } from '../firebase/config'
import useNotifications from '../hooks/useNotifiactions'
type UserInfoProps = {
    openModal: boolean
    setOpenNotificationModal: Dispatch<SetStateAction<boolean>>
    openNotificationModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
}
function TopContainerSidebar({openModal, setOpenModal, setOpenNotificationModal}: UserInfoProps) {
    const addFriend = () => {
        setOpenModal(true)
    }
    const {user, setUser} = useUserContext()
    const [notificationQunatity, setNotificationsQuantity] = useState<number>(0)
    const [notifications, setNotifications] = useState<any>(null)
    const getNotifications = async () => {
        let res = await useNotifications("get", "", user)
        return res
    }
    useEffect(() => {
        setNotifications(getNotifications())
    }, [])

    useEffect(() => {
        getNotifications().then((res:any) => 
            setNotificationsQuantity(res.length)
        )
    }, [])
  return (
    <div className='flex justify-between items-center m-4 p-2 bg-neutral-700 rounded-lg shadow-lg'>
        <div className='relative'>
            <button 
            onClick={() => setOpenNotificationModal(true)}
            className='text-green-600 text-xl p-2 hover:bg-neutral-600 rounded-full shadow-lg'><IoNotifications /></button>
            {
                notificationQunatity > 0 &&
                <div className='absolute top-5 left-5'>
                    <p className='bg-red-600 px-2 rounded-full'>{notificationQunatity}</p>
                </div>
            }
        </div>
        <div className='text-stone-500'>
            |
        </div>
        <div>
            <button className='text-green-600 text-xl p-2 hover:bg-neutral-600 rounded-full shadow-lg' 
            onClick={addFriend}><TiUserAdd /></button>
        </div>
    </div>
  )
}

export default TopContainerSidebar