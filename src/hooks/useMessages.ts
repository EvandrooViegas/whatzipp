import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { MdSportsGolf } from "react-icons/md";
import { MessagesType } from "../../interfaceTypes";
import { UserContext, useUserContext } from "../context/UserContext";
import { db } from "../firebase/config";

export default async function useMessages(action:string, message?:any, user?:any) {
    let error = ""
    let loading = false
    let result = ""

    const messageCollectionRef = collection(db, "message")
    loading = true
    if(action == "add") {
        await addDoc(messageCollectionRef, message).then(() => {
            loading = false
        }).catch((error) => {
            error = error
        })
    }

    if(action == "get") {
        
        
    }

    if(action == "delete") {
     
        const messageRef = doc(db, "message", message.id)
        deleteDoc(messageRef)

        
    }

    return {loading, error, result}
}