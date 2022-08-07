import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"


export default async function useNotification(action:string, id:string="", user:any=null) {
    
    if(action == "get") {
        if(user) {
            const docsRef = collection(db, "notification")
            const data = await getDocs(docsRef)
            const tempList = await data.docs.map((doc:any) => ({...doc.data(), id: doc.id, accepted: false}))
            const filtredList = await tempList?.filter(doc => doc.to === user.email)

            return filtredList
        
        }
    }

    if(action == "delete") {
        if(id) {
            console.log("hii")
            const notificationToDelete = doc(db, "notification", id)
            const result = await deleteDoc(notificationToDelete)
            console.log(notificationToDelete)
            return result

        }
    }
}