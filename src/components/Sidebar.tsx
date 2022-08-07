import React, { Dispatch, SetStateAction, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import {MdLogout} from "react-icons/md"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import UserInfo from './UserInfo'
import Rooms from './Rooms'
import TopContainerSidebar from './TopContainerSidebar'
import AddFriendModal from './AddFriendModal'
import NotificationModal from './NotificationModal'
import { RoomType } from '../../interfaceTypes'
type SideBarProps = {
  isOpen: boolean

}
function Sidebar({isOpen} : SideBarProps) {
    const {user, setUser} = useUserContext()
    const [openModal, setOpenModal] = useState(false)
    const [openNotificationModal, setOpenNotificationModal] = useState(false)
 
  return (
    <>
        {openModal &&
          <AddFriendModal openModal={openModal} setOpenModal={setOpenModal}/>
        }

        {
          openNotificationModal &&
          <NotificationModal  openModal={openModal} setOpenModal={setOpenModal} setOpenNotificationModal={setOpenNotificationModal} openNotificationModal={openNotificationModal} />
        }
        <TopContainerSidebar openModal={openModal} setOpenModal={setOpenModal} setOpenNotificationModal={setOpenNotificationModal} openNotificationModal={openNotificationModal}  />
        <Rooms openModal={openModal} setOpenModal={setOpenModal} />
        <UserInfo  />
    </>
  )
}

export default Sidebar