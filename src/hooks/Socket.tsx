import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import io from "socket.io-client"
import { setMessage, setOnlineUser } from '../redux/slice/userDetailsSlice'


const authUser: any = sessionStorage.getItem("userData")
const user: any = JSON.parse(authUser)

const Socket = () => {
  const dispatch = useDispatch()
  let socket: any;

  useEffect(() => {
    if (user) {
      socket = io("https://chatapp-backend-6v42.onrender.com/", {
        query: {
          userId: user?.data.id
        }
      })

      socket.on("onlineUsers", (user: any) => {
        dispatch(setOnlineUser(user))
      })

      return () => {
        socket.close()
      }
    } else {
      if (socket) {
        socket.close()
      }
    }
  }, [user])


  return null
}



export const getConversation = () => {
  let socket: any;
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      socket = io("https://chatapp-backend-6v42.onrender.com/", {
        query: {
          userId: user?.data.id
        }
      })
      socket.on("newMessage", (message: any) => {
        console.log(message)
        dispatch(setMessage(message))
      })
    }
  }, [])
}







export { Socket }