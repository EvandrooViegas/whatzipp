import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import { UserContext } from "./context/UserContext"
import { useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { SelectedRoomContext, useSelectedRoomContext } from "./context/SelectedRoomContext"

function App() {
  const [user, setUser] = useState<any>(null)
  const [selectedRoom, setSelectedRoom] = useState<any>("")
  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        let username; 
        const currentUserEmail:any = currentUser.email 
        const email = currentUserEmail.split("@")
        username = email[0]
        setUser({...currentUser, username})
      } else{
        setUser("")
      }
      
    })
  }, [])

  return (
      <UserContext.Provider value={{ user, setUser }}>
        <SelectedRoomContext.Provider value={{selectedRoom, setSelectedRoom}}>
          <BrowserRouter>
          
            <Routes>  
        
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/register" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />


            </Routes>
          </BrowserRouter>
        </SelectedRoomContext.Provider>
      </UserContext.Provider>

  )
}

export default App
