import { Dispatch, SetStateAction } from "react"
export type userType = {
    name: string, 
    email: string, 
    password: string, 
    uid: string
}

export type RoomType = {
 
    name: string, 
    owner: string, 
    participant: string,
    id:string,
    messages: {
      title: string, 
      by: string, 
      to: string
    }[]
 
}

export type MessagesType = {
  title: string, 
  by: string, 
  to: string, 
  roomId: string
  id: string
}