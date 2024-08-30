import { useDispatch, useSelector } from "react-redux"
import LogoutButton from "../../components/logoutButton/LogoutButton"
import MessageSender from "../../components/messgeSender/MessageSender"
import Topbar from "../../components/topbar/Topbar"
import User from "../../components/user/User"
import { logoutUser } from "../../redux/slice/authSlice"
import { RootState } from "../../redux/store/store"
import Message from "../../components/message/Message"
import { useEffect, useRef, useState } from "react"
import { fetchMessages, fetchUsers, postProfilePic, sendMessage } from "../../redux/slice/userDetailsSlice"
import { toast } from "react-toastify"
import { User2, User2Icon } from "lucide-react"
import { getConversation, Socket } from "../../hooks/Socket"
import NoChat from "../../components/noChat/NoChat"
import ZoomImage from "../../components/zoomImage/ZoomImage"


const Home = () => {

  const dispatch: any = useDispatch()
  const status = useSelector((state: RootState) => state.auth.status)
  const messageStatus = useSelector((state: RootState) => state.users.status)
  const onlineUsers = useSelector((state: RootState) => state.users.onlineUser)
  const users = useSelector((state: RootState) => state.users.users)
  const messages = useSelector((state: RootState) => state.users.messages)
  const [message, setMessage] = useState<string>("")
  const [receiverId, setReceiverId] = useState<string>("")
  const [receiver, setReceiver] = useState<any>()
  const [zoomIn, setZoomIn] = useState<boolean>(false)
  const [zoomInRec, setZoomInRec] = useState<boolean>(false)
  const [img, setImg] = useState<string>("")
  const bottomRef: any = useRef()
  const userProfilePic: any = sessionStorage.getItem("profilePic")
  const profilePic = JSON.parse(userProfilePic)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  getConversation()


  const handlePostProfilePic = (e: any) => {
    if (e.target.files?.[0].size < 10485760) {
      dispatch(postProfilePic(e))
    }else{
      toast.error("Max file size is 10MB")
    }
  };


  const handleSendMessage = (receiverId: any, message: any) => {
    if (message !== "") {
      dispatch(sendMessage({ receiverId, message })).then(() => {
        setMessage("")
        dispatch(fetchMessages(receiverId))
      })
    } else (
      toast.error("Write a message !")
    )
  }

  useEffect(() => {
    if (bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [handleSendMessage])


  return (
    <div className="w-screen flex h-screen overflow-hidden bg-[#EBF4F6]">
      {zoomIn && <ZoomImage
        isEdit={true}
        status={messageStatus}
        img={img}
        onClose={() => setZoomIn(false)}
        onEdit={handlePostProfilePic}
      />}
      {zoomInRec && <ZoomImage
        isEdit={false}
        onClose={() => setZoomInRec(false)}
        img={img}
      />}
      <div className="w-[20%] flex flex-col gap-4 min-w-[300px] h-full px-4">
        <h1 className="text-center mt-6 text-[36px] font-semibold text-[#b1b1b1]">CHAT<span className="text-[#088395]">APP</span></h1>
        <div className="flex flex-col flex-nowrap py-3 gap-1 h-[80vh] overflow-y-auto">
          {users?.map((data) => (
            <User
              onlineStatus={onlineUsers?.includes(data._id)}
              onClick={() => {
                setReceiverId(data._id)
                dispatch(fetchMessages(data._id))
                setReceiver(data)
                setImg(data?.profilePic?.profilePic ? data?.profilePic?.profilePic : User2)
              }}
              className={`${data._id === receiverId ? "bg-[#088395] " : "bg-[#37B7C3] "}`}
              key={data._id}
              name={data.username}
              username={data.username}
              userPic={data?.profilePic?.profilePic}
            />
          ))}
        </div>


        <div className="flex items-center justify-center mb-4 gap-4">
          <LogoutButton
            status={status}
            onClick={() => {
              dispatch(logoutUser())
            }}
          />
          <div onClick={() => {
            setImg(profilePic?.profilePic)
            setZoomIn(true)
          }} className="relative flex items-center justify-center gap-2">
            {
              !profilePic ? <User2Icon className="cursor-pointer h-12 w-12 rounded-[50%] p-2  bg-[#37B7C3]" />
                :
                <img className=" h-12 cursor-pointer border-2 border-[#088395] w-12 object-cover object-center rounded-[50%]" src={profilePic?.profilePic} alt="" />
            }

          </div>
        </div>
      </div>


      {receiverId !== "" ?

        <div className=" h-full relative w-[80%] overflow-hidden rounded-l-3xl border-l-[6px] border-[#088395]">
          {receiverId !== "" &&
            <Topbar
              onClick={() => setZoomInRec(true)}
              name={receiver?.username}
              img={receiver?.profilePic?.profilePic}
            />}
          <div className="flex  flex-col h-[81vh] w-[90%] bg-white mx-auto rounded-xl py-5 overflow-y-auto gap-2 mt-4 px-3 pr-10">
            {messages?.map((data, index) => (
              <Message
                userPic={data.senderId === receiverId ? receiver?.profilePic?.profilePic : profilePic?.profilePic}
                key={index}
                side={data.senderId === receiverId}
                message={data.message}
                color={data.senderId === receiverId ? "bg-[#EBF4F6]" : "flex-end bg-[#37B7C3] text-white"}
                className={data.senderId === receiverId ? "" : "self-end"}
              />
            ))}
            <span ref={bottomRef}></span>
            {messages?.length === undefined && <>
              {receiverId !== "" && <h1 className="text-[40px] self-center mt-60 text-black/70 font-semibold">Start conversation</h1>}

            </>}


          </div>

          {receiverId !== "" && <div className="absolute bottom-0 rounded-bl-3xl rounded-lg h-16 px-10 w-full bg-white ">
            <MessageSender
              status={messageStatus}
              value={message}
              onChange={(e: any) => {
                setMessage(e.target.value)
              }}
              onClick={() => {
                handleSendMessage(receiverId, message)
              }}
            />
          </div>}



        </div>
        : <NoChat />}

      <Socket />
    </div>

  )
}

export default Home