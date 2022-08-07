import { createContext, useContext } from "react"
export const SelectedRoomContext = createContext<any>("")
export const useSelectedRoomContext = () => useContext(SelectedRoomContext)