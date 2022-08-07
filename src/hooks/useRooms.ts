import { addDoc, collection, getDoc, getDocs } from "firebase/firestore"
import { UserContext } from "../context/UserContext"
import { db } from "../firebase/config"


export default async function useRooms(id:string, action?:string, notifiaction?:any, owner?:any, participant?:any, user?:any) {
    if(action == "add") {

        if(notifiaction) {
            const roomCollectionRef = await collection(db, "room")
            const newRoom = await addDoc(roomCollectionRef, {name: notifiaction.roomName, messages: [], owner: notifiaction.by, participant: notifiaction.to})
        
        }

    }
    
    if(action == "delete") {
        
    }

    if(action == "get") {

        const roomCollectionRef = collection(db, "room")
        const res = await getDocs(roomCollectionRef)
        const tempList = res.docs.map((res:any) => (({...res.data(), id:res.id})))    
        const filtredList = await tempList?.filter(room => room.participant === user.email || room.owner === user.email)
 
        return filtredList
    }
}