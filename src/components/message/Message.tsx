import { FC } from "react"
import user from "/assets/user.jpg"
const Message:FC<any> = ({color, message, userPic,side ,className}) => {
  return (
    <div className={`${className} flex gap-2 rounded-[50%] border-none`}>
     {side ?  <>
        <img className="w-9 h-9 object-cover object-center rounded-[50%]" src={userPic ? userPic : user} alt="" />
        <span className={`${color} px-2 rounded-lg text-black/70 p-1 max-w-80 `}>{message}</span>
      </>:
       <>
       <span className={`${color} px-2 rounded-lg text-black/70 p-1 max-w-80 `}>{message}</span>
       <img className="w-9 h-9 object-cover object-center rounded-[50%]" src={userPic ? userPic : user} alt="" />
     </>}
    </div>
  )
}

export default Message